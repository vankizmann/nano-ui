import { Str, Arr, Obj, Mix, Locale, Dom, Num } from "@kizmann/pico-js";

export default {

    name: 'NSelect',

    inject: {

        NFormItem: {
            default: undefined
        }

    },

    props: {

        modelValue: {
            default()
            {
                return null;
            },
        },

        clearValue: {
            default()
            {
                return null;
            }
        },

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        },

        theme: {
            default()
            {
                return 'dark';
            },
            type: [String]
        },

        lazy: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

        position: {
            default()
            {
                return 'bottom-start';
            },
            type: [String]
        },

        multiple: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        collapse: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        clearable: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        placeholder: {
            default()
            {
                return Locale.trans('Please select');
            },
            type: [String]
        },

        emptyText: {
            default()
            {
                return 'No items';
            },
            type: [String]
        },

        undefinedText: {
            default()
            {
                return 'Undefined item';
            },
            type: [String]
        },

        collapseText: {
            default()
            {
                return '+:count item|+:count items';
            },
            type: [String]
        },

        allowCreate: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        options: {
            default()
            {
                return [];
            },
            type: [Array, Object]
        },

        optionsValue: {
            default()
            {
                return '$index';
            },
            type: [String]
        },

        optionsLabel: {
            default()
            {
                return '$value';
            },
            type: [String]
        },

        optionsDisabled: {
            default()
            {
                return 'null';
            },
            type: [String]
        }

    },

    computed: {

        deepDisabled()
        {
            return this.NFormItem ? this.NFormItem.disabled(this.disabled) :
                this.disabled;
        },

        empty()
        {
            return Mix.isEmpty(this.tempValue);
        },

        custom()
        {
            let result = Arr.filter(this.elements, (element) => {

                if ( Mix.isArray(this.tempValue) ) {
                    return Arr.has(this.tempValue, element.value);
                }

                return element.value === this.tempValue;
            });

            return result.length === 0;
        }

    },

    data()
    {
        return {
            tempValue: this.modelValue,
            tempClear: this.clearValue,
            focus: false,
            search: '',
            index: - 1,
            elements: [],
            searched: []
        };
    },

    beforeMount()
    {
        if ( this.lazy || ! this.$slots.default ) {
            this.generateOptions();
        }

        if ( this.multiple && !Mix.isArray(this.tempValue) ) {
            this.tempValue = [];
        }

        if ( this.multiple && !Mix.isArray(this.clearValue) ) {
            this.tempClear = [];
        }

        this.searchOptions();
    },

    provide()
    {
        return {
            NSelect: this
        };
    },

    watch: {

        modelValue(value)
        {
            if ( !this.multiple && Mix.isArray(value) ) {
                value = null;
            }

            if ( this.multiple && !Mix.isArray(value) ) {
                value = [];
            }

            this.tempValue = value;
        },

        options()
        {
            this.generateOptions();
        },

        search()
        {
            this.searchOptions();
        },

        focus()
        {
            this.$nextTick(() => this.scrollToClosest());
        },

    },

    methods: {

        clear(event = null)
        {
            if ( event ) {
                event.preventDefault();
                event.stopPropagation();
            }

            this.focusInput();

            this.$emit('update:modelValue',
                this.tempValue = Arr.clone(this.tempClear));
        },

        generateOptions()
        {
            this.elements = Arr.each(this.options, (value, index) => {

                let data = {
                    $value: value, $index: index
                };

                let option = {
                    label: Obj.get(data, this.optionsLabel),
                    value: Obj.get(data, this.optionsValue)
                };

                return Obj.assign(option, {
                    tempLabel: option.label, tempValue: option.value
                });
            });
        },

        addOption(option)
        {
            Arr.add(this.elements, option,
                { tempValue: option.tempValue });
        },

        removeOption(option)
        {
            Arr.remove(this.elements,
                { tempValue: option.tempValue });
        },

        resetInput()
        {
            this.index = - 1;
            this.search = '';
        },

        focusInput(event = null)
        {
            if ( event ) {
                event.preventDefault();
            }

            this.focus = true;
        },

        onFocusInput()
        {
            if ( !this.focus ) {
                this.focus = true;
            }
        },

        onInputInput(event)
        {
            this.search = event.target.value;
        },

        onKeydownInput(event)
        {
            if ( !this.focus ) {
                return this.onFocusInput();
            }

            if ( event.which === 13 ) {
                this.createOrToggle();
            }

            if ( event.which === 38 ) {
                this.selectPrev();
            }

            if ( event.which === 40 ) {
                this.selectNext();
            }
        },

        searchOptions()
        {
            this.index = - 1;

            if ( Mix.isEmpty(this.search) ) {
                return this.searched = this.elements;
            }

            let searchRegex = new RegExp(this.search, 'i');

            this.searched = Arr.filter(this.elements, (option) => {
                return Mix.string(option.label || '').match(searchRegex);
            });
        },

        toggleOption(value, event = null)
        {
            if ( Mix.isEmpty(value) ) {
                return;
            }

            if ( event && event.which !== 1 ) {
                return;
            }

            if ( event ) {
                event.preventDefault();
            }

            let tempValue = this.tempValue;

            if ( this.multiple ) {
                this.focusInput();
            }

            if ( !this.multiple ) {
                tempValue = value;
            }

            if ( this.multiple ) {
                Arr.toggle(tempValue, value);
            }

            this.$refs.popover.close();

            let denyUpdate = this.tempValue === tempValue;

            if ( this.multiple && !Mix.isArray(this.modelValue) ) {
                denyUpdate = false;
            }

            if ( !this.multiple && Mix.isArray(this.modelValue) ) {
                denyUpdate = false;
            }

            if ( denyUpdate ) {
                return;
            }

            this.$emit('update:modelValue',
                this.tempValue = tempValue);
        },

        getOptionLabel(value)
        {
            let option = Arr.find(this.elements,
                { tempValue: value });

            if ( !option && this.allowCreate ) {
                return value;
            }

            if ( !option && !this.allowCreate ) {
                return this.trans(this.undefinedText);
            }

            return option.tempLabel;
        },

        selectPrev()
        {
            let newIndex = this.index - 1;

            if ( newIndex < 0 ) {
                newIndex = this.searched.length - 1;
            }

            this.index = newIndex;

            this.scrollToCurrent();
        },

        selectNext()
        {
            let newIndex = this.index + 1;

            if ( newIndex > this.searched.length - 1 ) {
                newIndex = 0;
            }

            this.index = newIndex;

            this.scrollToCurrent();
        },

        createOrToggle()
        {
            if ( this.allowCreate && this.search ) {
                return this.createOption();
            }

            let selected = Arr.get(this.searched,
                this.index);

            if ( this.searched.length === 1 ) {
                selected = Arr.first(this.searched);
            }

            if ( !selected || selected.disabled ) {
                return;
            }

            this.toggleOption(selected.tempValue);
        },

        createOption()
        {
            this.toggleOption(this.search);

            this.search = '';
        },

        scrollToCurrent()
        {
            if ( !this.focus ) {
                return;
            }

            let selected = Arr.get(this.searched,
                this.index);

            if ( !selected ) {
                return;
            }

            if ( this.$refs.scrollbar ) {
                this.$refs.scrollbar.scrollIntoView(`[data-option="${selected._.uid}"]`);
            }

            if ( this.$refs.virtualscroll ) {
                this.$refs.virtualscroll.scrollToIndex(this.index);
            }
        },

        scrollToClosest()
        {
            if ( !this.focus ) {
                return;
            }

            let value = this.tempValue;

            if ( Mix.isArray(this.tempValue) ) {
                value = Arr.first(this.tempValue);
            }

            if ( !value ) {
                return;
            }

            let index = Arr.findIndex(this.elements, {
                tempValue: value
            });

            if ( !index ) {
                return;
            }

            if ( this.$refs.virtualscroll ) {
                this.$refs.virtualscroll.scrollToIndex(index, 0);
            }

            let select = `[data-option="${Obj.get(this.elements[index], '_.uid', 0)}"]`;

            if ( this.$refs.scrollbar ) {
                this.$refs.scrollbar.scrollIntoView(select, 0);
            }
        }

    },

    renderLabelClear()
    {
        if ( !this.clearable || Mix.isEmpty(this.tempValue) ) {
            return null;
        }

        let props = {};

        if ( !this.deepDisabled ) {
            props.onMousedown = this.clear;
        }

        return (
            <div class="n-select__clear n-form-clear" {...props}>
                <i class={nano.Icons.times}></i>
            </div>
        );
    },

    renderLabelAngle()
    {
        return (
            <div class="n-select__angle n-form-angle">
                <i class={nano.Icons.angleDown}></i>
            </div>
        );
    },

    renderLabelItem(value)
    {
        let classList = [
            'n-select__item'
        ];

        let props = {
            class: nano.Icons.times,
        };

        if ( !this.deepDisabled ) {
            props.onMousedown = (event) => this.toggleOption(value, event);
        }

        let labelHtml = (
            <span>{this.getOptionLabel(value)}</span>
        );

        return (
            <div class={classList}>
                {[labelHtml, <i {...props}></i>]}
            </div>
        );
    },

    renderLabelCollapse()
    {
        let first = Arr.first(this.tempValue);

        if ( !first ) {
            return null;
        }

        let firstHtml = this.ctor('renderLabelItem')(first);

        if ( this.tempValue.length === 1 ) {
            return firstHtml;
        }

        let count = this.tempValue.length - 1;

        let collapseHtml = (
            <div class="n-select__item">
                <span>{this.choice(this.collapseText, count)}</span>
            </div>
        );

        return [
            firstHtml, collapseHtml
        ];
    },

    renderLabelItems()
    {
        if ( !Mix.isArray(this.tempValue) ) {
            return null;
        }

        if ( this.collapse ) {
            return this.ctor('renderLabelCollapse')();
        }

        return Arr.each(this.tempValue, (value) => {
            return this.ctor('renderLabelItem')(value);
        });
    },

    renderMultiple()
    {
        let isEmptyValue = Mix.isEmpty(this.tempValue) &&
            !Mix.isNumber(this.tempValue);

        let props = {
            value: this.search,
            placeholder: this.placeholder,
            disabled: this.deepDisabled,
            onFocus: this.onFocusInput,
            onInput: this.onInputInput,
            onKeydown: this.onKeydownInput
        };

        if ( !this.focus ) {
            props.value = null;
        }

        if ( !isEmptyValue ) {
            props.placeholder = null;
        }

        let inputHtml = (
            <div class="n-select__input">
                <input ref="input" {...props} />
            </div>
        );

        return [
            this.ctor('renderLabelClear')(),
            (
                <div class="n-select__items">
                    {[this.ctor('renderLabelItems')(), inputHtml]}
                </div>
            ),
            this.ctor('renderLabelAngle')()
        ];
    },

    renderSingle()
    {
        let isEmptyValue = Mix.isEmpty(this.tempValue) &&
            !Mix.isNumber(this.tempValue);

        let modelLabel = this.getOptionLabel(
            this.tempValue);

        if ( isEmptyValue ) {
            modelLabel = null;
        }

        let props = {
            value: this.search,
            placeholder: this.placeholder,
            disabled: this.deepDisabled,
            onFocus: this.onFocusInput,
            onInput: this.onInputInput,
            onKeydown: this.onKeydownInput
        };

        if ( !this.search && this.custom ) {
            props.value = this.tempValue;
        }

        if ( !this.focus ) {
            props.value = modelLabel;
        }

        if ( !isEmptyValue ) {
            props.placeholder = modelLabel;
        }

        return [
            this.ctor('renderLabelClear')(),
            (
                <div class="n-select__input">
                    <input ref="input" {...props} />
                </div>
            ),
            this.ctor('renderLabelAngle')()
        ];
    },

    renderDisplay()
    {
        let classList = [
            'n-select__display'
        ];

        if ( this.multiple ) {
            classList.push('n-multiple');
        }

        let displayHtml = this.ctor('renderSingle');

        if ( this.multiple ) {
            displayHtml = this.ctor('renderMultiple');
        }

        return (
            <div class={classList}>{displayHtml()}</div>
        );
    },

    renderItems()
    {
        let emptyHtml = (
            <div class="n-popover-shadow n-select__empty">
                <NEmptyIcon inline={true}>{this.trans(this.emptyText)}</NEmptyIcon>
            </div>
        );

        if ( !this.searched.length ) {
            return emptyHtml;
        }

        if ( this.lazy || ! this.$slots.default ) {
            return this.ctor('renderLazyItems')();
        }

        let options = Obj.each(this.searched, (option, index) => {
            return option.ctor('renderOption')(index);
        });

        let props = {
            size: this.size
        };

        return (
            <NScrollbar ref="scrollbar" class="n-popover-shadow n-select__body" {...props}>
                {Mix.vals(options)}
            </NScrollbar>
        );
    },

    renderLazyOption(value, index)
    {
        let classList = [];

        let isMultipleActive = this.multiple &&
            Arr.has(this.tempValue, value.value);

        if ( isMultipleActive ) {
            classList.push('n-active');
        }

        let isSingleActive = ! this.multiple &&
            this.tempValue === value.value;

        if ( isSingleActive ) {
            classList.push('n-active');
        }

        if ( this.index === Mix.int(index) ) {
            classList.push('n-focus');
        }

        let props = {
            'type': this.type,
            'clickClose': ! this.multiple,
        };

        props['onMousedown'] = (e) => {
            this.toggleOption(value.value, e);
        };

        if ( isSingleActive || isMultipleActive ) {
            props.icon = nano.Icons.checked;
        }

        return (
            <NPopoverOption class={classList} {...props}>
                {value.label}
            </NPopoverOption>
        );
    },

    renderLazyItems()
    {
        let props = {
            items: this.searched, offsetY: 0, uniqueProp: 'tempValue'
        };

        props.renderNode = ({ value, index }) => {
            return this.ctor('renderLazyOption')(value, index);
        };

        return (
            <NVirtualscroller ref="virtualscroll" class="n-popover-shadow n-select__body" {...props} />
        );
    },

    renderPopover()
    {
        let classList = [
            'n-popover--select',
        ];

        if ( this.lazy ) {
            classList.push('n-virtual');
        }

        let props = {
            class: classList,
            trigger: 'click',
            width: - 1,
            listen: true,
            size: this.size,
            position: this.position,
            scrollClose: true,
            disabled: this.deepDisabled,
            onClose: this.resetInput
        };

        return (
            <NPopover ref="popover" vModel={this.focus} {...props}>
                {{ raw: this.ctor('renderItems') }}
            </NPopover>
        );
    },

    renderOptions()
    {
        if ( this.lazy ) {
            return null;
        }

        if ( Mix.isEmpty(this.options) ) {
            return this.$slots.default && this.$slots.default();
        }

        let optionRender = ($value, $index) => {

            let props = {
                label: Obj.get({ $value, $index }, this.optionsLabel, null),
                value: Obj.get({ $value, $index }, this.optionsValue, null),
            };

            return (<NSelectOption {...props}></NSelectOption>);
        };

        return Mix.vals(Obj.map(this.options, optionRender));
    },

    render()
    {
        let classList = [
            'n-select',
            'n-select--' + this.type,
            'n-select--' + this.size,
        ];

        let isEmptyValue = Mix.isEmpty(this.tempValue) &&
            !Mix.isNumber(this.tempValue);

        if ( isEmptyValue ) {
            classList.push('n-empty');
        }

        if ( this.clearable ) {
            classList.push('n-clearable');
        }

        if ( this.focus ) {
            classList.push('n-focus');
        }

        if ( this.deepDisabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList} onClick={this.focusInput}>
                {this.ctor('renderDisplay')()}
                {this.ctor('renderPopover')()}
                {this.ctor('renderOptions')()}
            </div>
        );
    },

}
