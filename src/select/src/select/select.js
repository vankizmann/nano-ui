import { Str, Arr, Any, Locale, Dom } from "nano-js";

export default {

    name: 'NSelect',

    props: {

        value: {
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

        size: {
            default()
            {
                return 'default';
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

        boundary: {
            default()
            {
                return null;
            }
        },

        multiple: {
            default()
            {
                return false;
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
                return this.trans('Please select');
            },
            type: [String]
        },

        emptyText: {
            default()
            {
                return this.trans('No items');
            },
            type: [String]
        },

        undefinedText: {
            default()
            {
                return this.trans('Undefined item');
            }
        },

        allowCreate: {
            default()
            {
                return false;
            },
            type: [Boolean]
        }

    },

    data()
    {
        return {
            veValue: this.value,
            veClearValue: this.clearValue,
            veOpen: false,
            veSearch: '',
            veIndex: -1,
            veOptions: [],
            veSearched: []
        };
    },

    provide()
    {
        return {
            NSelect: this
        };
    },

    watch: {

        value()
        {
            if ( this.veValue !== this.value ) {
                this.veValue = this.value;
            }
        },

    },

    methods: {

        clear()
        {
            this.$emit('input', this.veValue = Arr.clone(this.veClearValue));
        },

        addOption(option)
        {
            Arr.add(this.veOptions, option, {
                veValue: option.veValue
            });
        },

        removeOption(option)
        {
            Arr.remove(this.veOptions, {
                veValue: option.veValue
            });
        },

        searchOptions()
        {
            if ( Any.isEmpty(this.veSearch) ) {
                return this.veSearched = this.veOptions;
            }

            let searchRegex = new RegExp(this.veSearch, 'i');

            this.veSearched = Arr.filter(this.veOptions, (option) => {
                return option.label.match(searchRegex);
            });
        },

        toggleOption(value, event)
        {
            if ( Any.isEmpty(value) ) {
                return;
            }

            if ( event ) {
                event.stopPropagation();
            }

            let veValue = this.veValue;

            if ( ! this.multiple ) {
                this.$refs.popover.close();
            }

            if ( ! this.multiple ) {
                veValue = value;
            }

            if ( this.multiple ) {
                Arr.toggle(veValue, value);
            }

            if ( this.veValue !== veValue ) {
                this.$emit('input', this.veValue = veValue);
            }
        },

        getOptionLabel(value)
        {
            let option = Arr.find(this.veOptions, { value });

            if ( ! option && this.allowCreate ) {
                return value;
            }

            if ( ! option && ! this.allowCreate ) {
                return this.undefinedText;
            }

            return option.label.trim();
        },

        openSelect()
        {
            clearTimeout(this.focusDelay);

            this.veOpen = true;

            if ( this.$refs.input ) {
                this.$refs.input.focus();
            }

            this.veIndex = -1;
        },

        closeSelect()
        {
            clearTimeout(this.focusDelay);

            this.veOpen = false;

            if ( this.$refs.input ) {
                this.$refs.input.blur();
            }

            this.veSearch = '';

            this.veIndex = -1;
        },

        selectPrev()
        {
            let newIndex = this.veIndex - 1;

            if ( newIndex < 0 ) {
                newIndex = this.veOptions.length - 1;
            }

            this.veIndex = newIndex;
        },

        selectNext()
        {
            let newIndex = this.veIndex + 1;

            if ( newIndex > this.veOptions.length - 1 ) {
                newIndex = 0;
            }

            this.veIndex = newIndex;
        },

        toggleSelected()
        {
            let selected = Arr.get(this.veSearched, this.veIndex);

            if ( this.veSearched.length === 1 ) {
                selected = Arr.get(this.veSearched, 0);
                this.veSearch = '';
            }

            if ( ! selected ) {
                return;
            }

            this.toggleOption(selected.veValue);
        },

        eventUpdateSearch(event)
        {
            this.veSearch = event.target.value;

            this.$once('hook:updated', this.$refs.popover.refresh);

            this.veIndex = -1;
        },

        eventFocusSearch(event)
        {
            this.focusDelay = setTimeout(this.openSelect, 200);
        },

        eventBlurSearch(event)
        {
            clearTimeout(this.focusDelay);

            this.focusDelay = setTimeout(() => {

                if ( this.veOpen && this.$refs.input ) {
                    this.$refs.input.focus();
                }

            }, 200);
        },

        eventKeydownSearch(event)
        {
            if ( event.which === 13 ) {

                if ( this.allowCreate && this.veIndex === -1 ) {
                    this.toggleOption(this.veSearch);
                    this.veSearch = '';
                }

                if ( ! this.allowCreate || this.veIndex !== -1 ) {
                    this.toggleSelected();
                }

            }

            if ( event.which === 38 ) {
                this.selectPrev();
            }

            if ( event.which === 40 ) {
                this.selectNext();
            }

            if ( event.which === 9 || event.which === 27 ) {
                this.$refs.popover.close();
            }
        },

        eventPopoverInput(input)
        {
            input ? this.openSelect() : this.closeSelect();
        }

    },

    created()
    {
        if ( this.multiple && ! Any.isArray(this.veValue) ) {
            this.veValue = [];
        }

        if ( this.multiple && ! Any.isArray(this.veClearValue) ) {
            this.veClearValue = [];
        }
    },

    beforeMount()
    {
        this.$watch('veSearch', this.searchOptions);

        this.searchOptions();
    },

    renderLabelInput()
    {
        let events = {
            input: this.eventUpdateSearch,
            focus: this.eventFocusSearch,
            blur: this.eventBlurSearch,
            keydown: this.eventKeydownSearch,
        };

        let style = {};

        if ( ! this.multiple && ! this.veOpen && ! Any.isEmpty(this.veValue) ) {
            style.opacity = 0;
        }

        let attrs = {
            type: 'text',
            disabled: this.disabled
        };

        if ( ! this.multiple && this.veOpen ) {
            attrs.placeholder = this.getOptionLabel(this.veValue);
        }

        if ( Any.isEmpty(this.veValue) && ! Any.isNumber(this.veValue) ) {
            attrs.placeholder = this.placeholder;
        }

        return (
            <input ref="input" class="n-select__input" style={style} value={this.veSearch} on={events} attrs={attrs} />
        );
    },

    renderLabelClear()
    {
        if ( ! this.clearable ) {
            return null;
        }

        let events = {
            click: this.clear
        };

        return (
            <div class="n-select__clear" on={events}>
                <span class={this.icons.times}></span>
            </div>
        );
    },

    renderLabelItem(value)
    {
        if ( Any.isEmpty(this.veValue) && ! Any.isNumber(this.veValue) ) {
            return null;
        }

        let classList = [
            'n-select__item'
        ];

        let style = {};

        if ( ! this.multiple && this.veOpen ) {
            style.display = 'none';
        }

        if ( ! this.multiple && this.veSearch ) {
            style.display = 'none';
        }

        let events = {
            click: () => this.toggleOption(value)
        };

        let removeHtml = null;

        if ( this.multiple ) {
            removeHtml = (<i on={events} class={this.icons.times}></i>);
        }

        return (
            <span class={classList} style={style}>
                { [this.getOptionLabel(value), removeHtml] }
            </span>
        );
    },

    renderLabelAngle()
    {
        return (
            <div class="n-select__angle">
                <span class={this.icons.angleDown}></span>
            </div>
        );
    },

    renderLabel()
    {
        let values = this.veValue;

        if ( ! Any.isArray(values) ) {
            values = [values];
        }

        return (
            <div class="n-select__label">
                { this.ctor('renderLabelClear')() }
                {
                    Arr.each(values, (value) => {
                        return this.ctor('renderLabelItem')(value)
                    })
                }
                { this.ctor('renderLabelInput')() }
                { this.ctor('renderLabelAngle')() }
            </div>
        );
    },

    renderDisplay()
    {
        let classList = [
            'n-select',
            'n-select--' + this.size
        ];

        if ( this.multiple ) {
            classList.push('n-select--multiple');
        }

        return (
            <div class={classList}>
                { this.ctor('renderLabel')() }
            </div>
        );
    },

    renderOptions()
    {
        if ( ! this.veSearched.length ) {
            return (<div class="n-select__empty">{this.emptyText}</div>);
        }

        return (
            <NScrollbar class="n-select__items" relative={true}>
                {
                    Arr.each(this.veSearched, (option, index) => {
                        return option.ctor('renderOption')(index);
                    })
                }
            </NScrollbar>
        )
    },

    renderPopover()
    {
        let props = {
            visible: this.veOpen,
            type: 'select',
            trigger: 'click',
            width: '100%',
            size: this.size,
            disabled: this.disabled,
            position: this.position,
            boundary: this.boundary,
            window: ! this.boundary,
        };

        let events = {
            input: this.eventPopoverInput
        };

        return (
            <NPopover ref="popover" props={props} on={events}>
                { this.ctor('renderOptions')() }
            </NPopover>
        );
    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-select__wrapper'
        ];

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                { this.ctor('renderDisplay')() }
                { this.ctor('renderPopover')() }
                { this.$slots.default }
            </div>
        );
    }

}
