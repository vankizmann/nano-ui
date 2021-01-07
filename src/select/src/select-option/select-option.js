import { UUID, Num, Arr, Obj, Any, Dom, Locale } from "nano-js";

export default {

    name: 'NSelectOption',

    inject: {

        NSelect: {
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

        prop: {
            default()
            {
                return '';
            },
            type: [String]
        },

        label: {
            default()
            {
                return null;
            }
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        }

    },

    computed: {

        veValue()
        {
            if ( Any.isEmpty(this.prop) ) {
                return this.value;
            }

            return Obj.get(this.value, this.prop);
        }

    },

    beforeMount()
    {
        this.NSelect.addOption(this);
    },

    destroyed()
    {
        this.NSelect.removeOption(this);
    },

    renderOption(index)
    {
        let classList = [
            'n-popover-option'
        ];

        if ( this.NSelect.multiple && Arr.has(this.NSelect.veValue, this.value) ) {
            classList.push('n-active');
        }

        if ( ! this.NSelect.multiple && this.NSelect.veValue === this.value ) {
            classList.push('n-active');
        }

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        if ( this.NSelect.veIndex === index ) {
            classList.push('n-current');
        }

        let events = {};

        if ( ! this.disabled ) {
            events.onClick = (event) => this.NSelect.toggleOption(this.veValue, event);
        }

        return (
            <div class={classList} data-option={this._uid} {...events}>
                { this.$slots.default ? this.$slots.default() : this.label }
            </div>
        );
    },

    render()
    {
        return null;
    }

}
