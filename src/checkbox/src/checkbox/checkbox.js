import { Arr, Any } from "nano-js";

export default {

    name: 'NCheckbox',

    model: {
        prop: 'checked'
    },

    inject: {

        NCheckboxGroup: {
            default: undefined
        }

    },

    props: {

        value: {
            default()
            {
                return '';
            }
        },

        checked: {
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

        name: {
            default()
            {
                return '';
            },
            type: [String]
        },

        size: {
            default()
            {
                return 'default';
            },
            type: [String]
        },

        intermediate: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        global: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        sort: {
            default()
            {
                return this.$vnode.key;
            },
            type: [Number, String]
        }

    },

    methods: {

        change(event)
        {
            if ( this.NCheckboxGroup && this.global === true ) {
                return this.NCheckboxGroup.toggleCheckbox();
            }

            if ( this.NCheckboxGroup && event.shiftKey === true ) {
                this.NCheckboxGroup.shiftIndex(this._uid);
            }

            if ( this.NCheckboxGroup && this.global === false ) {
                this.NCheckboxGroup.pushIndex(this._uid);
            }

            this.$emit('input', !this.nativeChecked);
        }

    },

    watch: {

        checked()
        {
            if ( ! Any.isEqual(this.checked, this.nativeChecked) ) {
                this.nativeChecked = this.checked;
            }
        }

    },

    data()
    {
        return {
            nativeChecked: this.checked, nativeDisabled: this.disabled
        };
    },

    mounted()
    {
        if ( this.NCheckboxGroup && this.global === false ) {
            this.NCheckboxGroup.addCheckbox(this);
        }

        if ( this.NCheckboxGroup ) {
            this.nativeChecked = Arr.has(this.NCheckboxGroup.value, this.value);
        }

        this.$on('input', (value) => this.nativeChecked = value);
    },

    destroyed()
    {
        if ( this.NCheckboxGroup && this.global === false ) {
            this.NCheckboxGroup.removeCheckbox(this);
        }
    },

    render(h)
    {
        let checked = this.global ?
            this.NCheckboxGroup.globalChecked : this.nativeChecked;

        let disabled = this.global ?
            this.NCheckboxGroup.globalDisabled : this.nativeDisabled;

        let intermediate = this.global ?
            this.NCheckboxGroup.globalIntermediate : this.intermediate;

        let className = [
            'n-checkbox', 'n-checkbox--' + this.size
        ];

        if ( checked === true ) {
            className.push('n-checkbox--checked');
        }

        if ( disabled === true ) {
            className.push('n-checkbox--disabled');
        }

        if ( intermediate === true ) {
            className.push('n-checkbox--intermediate');
        }

        let attrs = {
            on: {}
        };

        if ( disabled === false ) {
            attrs.on.click = this.change;
        }

        return (<div class={className} {...attrs}>
            <div class="n-checkbox__checkbox">
                { intermediate === true ?
                    this.$slots.intermediate || <span class="fa fa-minus"></span> :
                    this.$slots.checked || <span class="fa fa-check"></span>
                }
            </div>
            { (this.$slots.default || this.$slots.label) &&
                <div class="n-checkbox__label">
                    {this.$slots.default || this.$slots.label}
                </div>
            }
            { this.global === false &&
                <div className="n-checkbox__input">
                    <input type="hidden" value={this.nativeChecked} name={this.name} />
                </div>
            }
        </div>);
    }

}
