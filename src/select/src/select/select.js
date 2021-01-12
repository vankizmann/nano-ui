import { Str, Arr, Obj, Any, Locale, Dom } from "nano-js";

export default {

    name: 'NSelect',

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
                return 'bottom-center';
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

    data()
    {
        return {
            tempValue: this.modelValue,
            tempClear: this.clearValue,
            focus: false,
            search: '',
            index: -1,
            elements: [],
            searched: []
        };
    },

    provide()
    {
        return {
            NSelect: this
        };
    },

    watch: {

        modelValue()
        {
            this.tempValue = this.modelValue;
        },

        search()
        {
            this.searchOptions();
        },

        focus()
        {
            this.$nextTick(this.scrollToClosest);
        },

    },

    methods: {

        clear(event = null)
        {
            if ( event ) {
                event.preventDefault();
            }

            this.focusInput();
            
            this.focus = true;

            this.$emit('update:modelValue', 
                this.tempValue = Arr.clone(this.tempClear));
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

        focusInput(event = null)
        {
            if ( event ) {
                event.preventDefault();
            }

            this.$refs.input.focus();
        },

        blurInput(event = null)
        {
            this.$refs.input.blur();
        },

        onFocusInput()
        {
            clearInterval(this.refresh);

            this.$refs.popover.open();
        },

        onBlurInput()
        {
            setTimeout(() => {
                this.index = -1;
                this.search = '';
                this.$refs.popover.close();
            }, 100);
        },

        onInputInput(event)
        {
            this.search = event.target.value;
        },

        onKeydownInput(event)
        {
            if ( ! this.focus ) {
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
            this.index = -1;

            if ( Any.isEmpty(this.search) ) {
                return this.searched = this.elements;
            }

            let searchRegex = new RegExp(this.search, 'i');

            let searched = Arr.filter(this.elements, (option) => {
                return option.label.match(searchRegex);
            });

            this.searched = searched;
        },

        toggleOption(value, event = null)
        {
            if ( Any.isEmpty(value) ) {
                return;
            }

            if ( event ) {
                event.preventDefault();
            }

            let tempValue = this.tempValue;

            if ( this.multiple ) {
                this.focusInput();
            }

            if ( ! this.multiple ) {
                tempValue = value;
            }

            if ( this.multiple ) {
                Arr.toggle(tempValue, value);
            }

            if ( ! this.multiple ) {
                this.$refs.popover.close();
            }

            if ( this.tempValue === tempValue ) {
                return;
            }

            this.$emit('update:modelValue', 
                this.tempValue = tempValue);
        },

        getOptionLabel(value)
        {
            let option = Arr.find(this.elements, 
                { tempValue: value });

            if ( ! option && this.allowCreate ) {
                return value;
            }

            if ( ! option && ! this.allowCreate ) {
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

            if ( ! selected || selected.disabled ) {
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
            if ( ! this.focus ) {
                return;
            }

            let selected = Arr.get(this.searched, 
                this.index);

            if ( ! selected ) {
                return;
            }

            this.$refs.scrollbar.scrollIntoView(
                `[data-option="${selected._.uid}"]`);
        },

        scrollToClosest()
        {
            if ( ! this.focus ) {
                return;
            }

            let value = this.tempValue;

            if ( Any.isArray(this.tempValue) ) {
                value = Arr.first(this.tempValue);
            }

            if ( ! value ) {
                return;
            }

            let target = Arr.find(this.elements, { 
                tempValue: value
             });

            if ( ! target ) {
                return;
            }

            this.$refs.scrollbar.scrollIntoView(
                `[data-option="${target._.uid}"]`);
        }

    },

    created()
    {
        if ( this.multiple && ! Any.isArray(this.tempValue) ) {
            this.tempValue = [];
        }

        if ( this.multiple && ! Any.isArray(this.clearValue) ) {
            this.tempClear = [];
        }
    },

    beforeMount()
    {
        this.searchOptions();
    },

    renderLabelClear()
    {
        if ( ! this.clearable || Any.isEmpty(this.tempValue) ) {
            return null;
        }

        let props = {};

        if ( ! this.disabled ) {
            props.onMousedown = this.clear;
        }

        return (
            <div class="n-select__clear" {...props}>
                <i class={this.icons.times}></i>
            </div>
        );
    },

    renderLabelAngle()
    {
        return (
            <div class="n-select__angle">
                <i class={this.icons.angleDown}></i>
            </div>
        );
    },

    renderLabelItem(value)
    {
        let classList = [
            'n-select__item'
        ];

        let props = {
            class: this.icons.times,
        };

        if ( ! this.disabled ) {
            props.onMousedown = (event) => this.toggleOption(value, event);
        }

        let labelHtml = (
            <span>{ this.getOptionLabel(value) }</span>
        );

        return (
            <div class={classList}>
                { [labelHtml, <i {...props}></i>] }
            </div>
        );
    },

    renderLabelCollapse()
    {
        let first = Arr.first(this.tempValue);

        if ( ! first ) {
            return null;
        }

        let firstHtml = this.ctor('renderLabelItem')(first);

        if ( this.tempValue.length === 1 ) {
            return firstHtml;
        }

        let count = this.tempValue.length - 1;

        let collapseHtml = (
            <div class="n-select__item">
                <span>{ this.choice(this.collapseText, count) }</span>
            </div>
        );

        return [
            firstHtml, collapseHtml
        ];
    },

    renderLabelItems()
    {
        if ( this.collapse ) {
            return this.ctor('renderLabelCollapse')();
        }

        return Arr.each(this.tempValue, (value) => {
            return this.ctor('renderLabelItem')(value);
        });
    },

    renderMultiple()
    {
        let isEmptyValue = Any.isEmpty(this.tempValue) &&
            ! Any.isNumber(this.tempValue);

        let props = {
            value: this.search,
            placeholder: this.placeholder,
            disabled: this.disabled,
            onBlur: this.onBlurInput,
            onFocus: this.onFocusInput,
            onInput: this.onInputInput,
            onKeydown: this.onKeydownInput
        };

        if ( ! this.focus ) {
            props.value = null;
        }

        if ( ! isEmptyValue ) {
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
                    { [this.ctor('renderLabelItems')(), inputHtml] }
                </div>
            ), 
            this.ctor('renderLabelAngle')()
        ];
    },

    renderSingle()
    {
        let isEmptyValue = Any.isEmpty(this.tempValue) &&
            ! Any.isNumber(this.tempValue);

        let modelLabel = this.getOptionLabel(
            this.tempValue);
        
        if ( isEmptyValue ) {
            modelLabel = null;
        }

        let props = {
            value: this.search,
            placeholder: this.placeholder,
            disabled: this.disabled,
            onBlur: this.onBlurInput,
            onFocus: this.onFocusInput,
            onInput: this.onInputInput,
            onKeydown: this.onKeydownInput
        };

        if ( ! this.focus ) {
            props.value = modelLabel;
        }

        if ( ! isEmptyValue ) {
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
            <div class={classList}>{ displayHtml() }</div>
        );
    },

    renderItems()
    {
        let emptyHtml = (
            <div class="n-select__empty">{ this.trans(this.emptyText) }</div>
        );
        
        if ( ! this.searched.length ) {
            return emptyHtml;
        }

        let options = Obj.each(this.searched, (option, index) => {
            return option.ctor('renderOption')(index);
        });

        let props = {
            relative: true, size: this.size
        }

        return (
            <NScrollbar ref="scrollbar" class="n-select__body" {...props}>
                { Obj.values(options) }
            </NScrollbar>
        );
    },

    renderPopover()
    {
        let props = {
            trigger: 'click',
            width: -1,
            size: this.size,
            scrollClose: true,
            disabled: this.disabled,
            onScrollClose: this.blurInput
        };

        return (
            <NPopover ref="popover" vModel={this.focus} {...props}>
                { { raw: this.ctor('renderItems') } }
            </NPopover>
        );
    },

    renderOptions()
    {
        if ( Any.isEmpty(this.options) ) {
            return this.$slots.default();
        }

        let optionRender = ($value, $index) => {

            let props = {
                label: Obj.get({ $value, $index }, this.optionsLabel, null),
                value: Obj.get({ $value, $index }, this.optionsValue, null),
            };

            return (<NSelectOption {...props}></NSelectOption>);
        };

        return Obj.values(Obj.each(this.options, optionRender));
    },

    render()
    {
        let classList = [
            'n-select',
            'n-select--' + this.type,
            'n-select--' + this.size,
        ];

        let isEmptyValue = Any.isEmpty(this.tempValue) &&
            ! Any.isNumber(this.tempValue);

        if ( isEmptyValue ) {
            classList.push('n-empty');
        }

        if ( this.clearable ) {
            classList.push('n-clearable');
        }

        if ( this.focus ) {
            classList.push('n-focus');
        }

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList} onMousedown={this.focusInput}>
                { this.ctor('renderDisplay')() }
                { this.ctor('renderOptions')() }
                { this.ctor('renderPopover')() }
            </div>
        );
    }

}
