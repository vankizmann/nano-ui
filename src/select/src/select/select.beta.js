import { Str, Arr, Any, Locale } from "nano-js";

export default {

    name: 'NSelect',

    props: {

        value: {
            default()
            {
                return this.multiple ? [] : null;
            },
        },

        clearValue: {
            default()
            {
                return this.multiple ? [] : null;
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

    computed: {

        filteredOptions()
        {
            let options = this.options;

            options = Arr.filter(options, (option) => {
                return Str.has(option.label, this.search);
            });

            return options;
        },

        nativeValue()
        {
            return this.multiple ? this.nativeSelected :
                Arr.first(this.nativeSelected);
        }

    },

    data()
    {
        return {
            veValue: this.value,
            veFocus: false,
            veOpen: false,
            veSearch: '',
            veIndex: null,
            veOptions: []
        };
    },

    provide()
    {
        return {
            NSelect: this
        };
    },

    methods: {

        addOption(option)
        {
            Arr.add(this.veOptions, option, {
                value: option.value
            });
        },

        removeOption(option)
        {
            Arr.remove(this.veOptions, {
                value: option.value
            });
        },

        toggleOption(value)
        {
            if ( ! this.multiple ) {
                return this.$emit('input', this.veValue = value);
            }

            this.$emit('input', Arr.toggle(this.veValue, value));
        },

        getOptionLabel(value)
        {
            let option = Arr.find(this.veOptions, { value });

            if ( ! option ) {
                return this.undefinedText;
            }

            return option.label;
        },

        eventUpdateSearch(event)
        {
            this.veSearch = event.target.value;
        },

        eventFocusSearch(event)
        {
            this.veFocus = true;
        },

        eventBlurSearch(event)
        {
            if ( this.veOpen ) {
                this.$refs.input.focus();
            }
        },

        eventKeydownSearch(event)
        {
            // this.veSearch = event.target.value;
        },

        eventFocusInput()
        {
            if ( this.$refs.input ) {
                this.$refs.input.focus();
            }
        },

        eventPopoverInput(input)
        {
            this.veOpen = input;
            this.veSearch = '';
        }

    },

    renderLabelInput()
    {
        let events = {
            input: this.eventUpdateSearch,
            focus: this.eventFocusSearch,
            blur: this.eventBlurSearch,
            keydown: this.eventKeydownSearch,
        };

        let attrs = {
            disabled: this.disabled
        };

        if ( ! this.multiple && this.veFocus ) {
            attrs.placeholder = this.getOptionLabel(this.veValue);
        }

        if ( Any.isEmpty(this.veValue) && ! Any.isNull(this.veValue) ) {
            attrs.placeholder = this.placeholder;
        }

        return (
            <input ref="input" class="n-select__input" type="text" value={this.veSearch} on={events} attrs={attrs} />
        );
    },

    renderLabelItem(value)
    {
        if ( ! this.multiple && this.veFocus ) {
            return null;
        }

        let classList = [
            'n-select__item'
        ];

        if ( this.multiple ) {
            classList.push('n-select__item--multiple');
        }

        let events = {
            click: () => this.toggleOption(value)
        };

        return (
            <span class={classList}>
                { this.getOptionLabel(value) } { this.multiple && <i on={events} class={this.icons.times}></i>}
            </span>
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
                {
                    Arr.each(values, (value) => {
                        return this.ctor('renderLabelItem')(value)
                    })
                }
                { this.ctor('renderLabelInput')() }
            </div>
        );
    },

    renderDisplay()
    {
        let classList = [
            'n-select', 'n-select--' + this.size
        ];

        if ( this.disabled ) {
            classList.push('n-select--disabled')
        }

        let events = {
            click: this.eventFocusInput
        };

        return (
            <div class={classList} on={events}>
                { this.ctor('renderLabel')() }
            </div>
        );
    },

    renderOptions()
    {
        if ( ! this.veOptions.length ) {
            return <div>{this.emptyText}</div>;
        }

        return (
            <div>
                {
                    Arr.each(this.veOptions, (option) => {
                        return option.ctor('renderOption')();
                    })
                }
            </div>
        )
    },

    renderPopover()
    {
        let props = {
            visible: this.veOpen,
            type: 'select',
            trigger: 'click',
            width: '100%',
            closeInside: ! this.multiple,
            disabled: this.disabled,
            position: this.position,
        };

        let events = {
            input: this.eventPopoverInput
        };

        return (
            <NPopover props={props} on={events} window={true}>
                { this.ctor('renderOptions')() }
            </NPopover>
        );
    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-select_wrapper'
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
