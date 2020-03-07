import { Arr, Obj, Any } from "nano-js";

export default {

    name: 'NRadio',

    model: {
        prop: 'checked'
    },

    inject: {

        NRadioGroup: {
            default: undefined
        }

    },

    props: {

        value: {
            default()
            {
                return null;
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

        size: {
            default()
            {
                return 'default';
            },
            type: [String]
        },

    },

    data()
    {
        return {
            veChecked: this.checked
        };
    },

    methods: {

        check()
        {
            if ( this.NRadioGroup ) {
                this.NRadioGroup.checkRadio(this);
            }

            this.$emit('input', this.veChecked = true);
        },

    },

    watch: {

        checked()
        {
            if ( this.checked !== this.veChecked ) {
                this.veChecked = this.checked;
            }
        }

    },

    beforeMount()
    {
        if ( this.NRadioGroup ) {
            this.veChecked = this.NRadioGroup.isChecked(this.value);
        }
    },

    mounted()
    {
        if ( ! this.NRadioGroup ) {
            return;
        }

        this.NRadioGroup.$watch('veValue', () => {
            this.veChecked = this.NRadioGroup.isChecked(this.value);
        });

        this.NRadioGroup.addRadio(this);
    },

    beforeDestroy()
    {
        if ( this.NRadioGroup && ! this.global ) {
            this.NRadioGroup.removeRadio(this);
        }
    },

    renderRadio()
    {
        return (
            <div class="n-radio__radio">
                <span class={this.icons.circle}></span>
            </div>
        );
    },

    renderLabel()
    {
        if ( ! this.$slots.default && ! this.$slots.label ) {
            return null;
        }

        return (
            <div class="n-radio__label">
                { this.$slots.default || this.$slots.label }
            </div>
        );
    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-radio',
            'n-radio--' + this.size
        ];

        if ( this.veChecked ) {
            classList.push('n-checked');
        }

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        let events = {};

        if ( ! this.disabled ) {
            events = Obj.clone(this.$listeners);
        }

        if ( ! this.disabled ) {
            events.click = this.check;
        }

        return (
            <div class={classList} on={events}>
                { this.ctor('renderRadio')() }
                { this.ctor('renderLabel')() }
            </div>
        );
    }

}
