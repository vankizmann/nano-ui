import { Str, Arr, Any, Locale } from "nano-js";

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

    methods: {

        clearNativeSelected()
        {
            this.nativeSelected = [];

            this.$emit('input', this.clearValue);
        },

        solveNativeSelected()
        {
            let selected = this.getSelected(this.value);

            if ( selected === null ) {
                return;
            }

            this.nativeSelected = selected;
        },

        getSelected(value)
        {
            if ( Any.isArray(value) === false ) {
                value = [value];
            }

            if ( Any.isEqual(this.nativeSelected, value) ) {
                return null;
            }

            value = Arr.filter(value, (selected) => {
                return Any.isEmpty(selected) === false;
            });

            return value;
        },

        addOption(option)
        {
            this.options.push(option);
        },

        removeOption(option)
        {
            Arr.remove(this.options, { _uid: option._uid });
        },

        toggleOption(value)
        {
            this.search = '';

            if ( this.multiple === false ) {
                this.visible = false;
            }

            if ( this.multiple === false ) {
                this.nativeSelected = [];
            }

            if ( this.multiple === true ) {
                this.$refs.input.focus();
            }

            Arr.toggle(this.nativeSelected, value);

            this.$emit('input', this.nativeValue);
        },

        selectCurrent()
        {
            if ( this.current === null ) {
                return;
            }

            let option = Arr.get(this.filteredOptions, this.current);

            if ( Any.isEmpty(option) === true ) {
                return;
            }

            if ( option.disabled === true ) {
                return;
            }

            this.toggleOption(option.realValue);
        },

        selectPrevious()
        {
            let total = this.filteredOptions.length;

            if ( Any.isEmpty(this.current) === true ) {
                return this.current = total - 1;
            }

            if ( this.current === 0 ) {
                return this.current = total - 1;
            }

            this.current--;
        },

        selectNext()
        {
            let total = this.filteredOptions.length;

            if ( Any.isEmpty(this.current) === true ) {
                return this.current = 0;
            }

            if ( this.current === total - 1 ) {
                return this.current = 0;
            }

            this.current++;
        },

        searchOptions(event)
        {
            this.search = event.target.value;
        },

        focusInput()
        {
            this.focus = true;
            this.visible = true;
        },

        focusoutInput()
        {
            this.focus = false;
        },

        keydownInput(event)
        {
            if ( event.keyCode === 9 ) {
                this.search = '';
            }

            let createOption = this.allowCreate === true &&
                this.current === null && this.search !== '';

            if ( event.keyCode === 13 && createOption === true ) {
                this.toggleOption(this.search);
            }

            if ( event.keyCode === 13 && createOption === false ) {
                this.selectCurrent();
            }

            if ( event.keyCode === 38 ) {
                this.selectPrevious();
            }

            if ( event.keyCode === 40 ) {
                this.selectNext();
            }

            if ( event.keyCode === 9 || event.keyCode === 27 ) {
                return this.visible = false;
            }

            this.visible = true;
        }

    },

    watch: {

        value: {
            handler: 'solveNativeSelected'
        },

        search()
        {
            this.current = null;
        }

    },

    data()
    {
        return {
            focus: false,
            visible: false,
            search: '',
            current: null,
            options: [],
            nativeSelected: []
        };
    },

    provide()
    {
        return {
            NSelect: this
        };
    },

    beforeMount()
    {
        this.solveNativeSelected();
    },

    updated()
    {
        if ( this.focus === false && this.visible === false ) {
            this.search = '';
        }
    },

    render(h)
    {
        let className = [
            'n-select', 'n-select--' + this.size
        ];

        if ( this.disabled === true ) {
            className.push('n-select--disabled');
        }

        let options = Arr.each(this.filteredOptions, (option, index) => {
            return option.render(h, Any.integer(index) === this.current);
        });

        let labels = Arr.each(this.nativeSelected, (selected) => {
            return Arr.find(this.options, { realValue: selected }, {
                label: this.allowCreate ? selected : this.undefinedText, realValue: selected
            });
        });

        let placeholder = '';

        if ( Any.isEmpty(labels) === true ) {
            placeholder = this.placeholder;
        }

        let option = Arr.find(this.options, {
            realValue: Arr.first(this.nativeSelected)
        });

        if (
            option !== null && this.multiple === false &&
            this.focus === true && this.allowCreate === false
        ) {
            placeholder = option.label.trim();
        }

        if (
            option === null && this.multiple === false &&
            this.focus === true && this.allowCreate === true
        ) {
            placeholder = Arr.first(this.nativeSelected);
        }

        let hideItems = Any.isEmpty(placeholder) === false ||
            (this.focus === true && this.multiple === false) ||
            (this.search !== '' && this.multiple === false);

        return (
            <div class={['n-select__wrapper', this.disabled && 'n-disabled']}>
                <div class={className} onClick={() => this.$refs.input.focus()}>
                    { ( this.clearable === true && this.disabled === false && this.nativeSelected.length !== 0 ) &&
                        <div class="n-select__clear" vOn:mousedown_stop={this.clearNativeSelected}>
                            <span class="fa fa-times"></span>
                        </div>
                    }
                    <div class="n-select__label">

                        { ( Any.isEmpty(labels) === false && hideItems === false ) &&
                            Arr.each(labels, (option) => {

                                let className = [
                                    'n-select__item'
                                ];

                                if ( this.multiple === true ) {
                                    className.push('n-select__item--multiple');
                                }

                                let clickEvent = () => {
                                    this.toggleOption(option.realValue);
                                };

                                return (
                                    <span class={className}>
                                        {option.label} { this.multiple && <i onClick={clickEvent} class="fa fa-times"></i>}
                                    </span>
                                );
                            })
                        }

                        <input ref="input" class="n-select__input" type="text" value={this.search} placeholder={placeholder} disabled={this.disabled} onInput={this.searchOptions} onFocus={this.focusInput} onFocusout={this.focusoutInput} onKeydown={this.keydownInput} />

                    </div>
                    <div class="n-select__arrow">
                        <span class="fa fa-angle-down"></span>
                    </div>
                </div>
                <NPopover vModel={this.visible} trigger="click" type="select" position={this.position} disabled={this.disabled} closeInside={false}>
                    { Any.isEmpty(options) === false ? options : <div class="n-select__empty">{ this.emptyText }</div> }
                </NPopover>
                { this.$slots.default }
            </div>
        );
    }

}
