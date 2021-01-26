import { Arr, Obj, Any } from "@kizmann/pico-js";

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
                return 'md';
            },
            type: [String]
        },

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        },

    },

    computed: {

        uid()
        {
            return this._.uid;
        }

    },

    data()
    {
        return {
            tempChecked: this.checked
        };
    },

    watch: {

        checked()
        {
            if ( this.checked !== this.tempChecked ) {
                this.tempChecked = this.checked;
            }
        }

    },

    beforeMount()
    {
        if ( this.NRadioGroup ) {
            this.tempChecked = this.NRadioGroup.isChecked(this.value);
        }
    },

    mounted()
    {
        if ( this.NRadioGroup ) {
            this.NRadioGroup.addRadio(this);
        }
    },

    beforeUnmount()
    {
        if ( this.NRadioGroup ) {
            this.NRadioGroup.removeRadio(this);
        }
    },

    methods: {

        check()
        {
            if ( this.NRadioGroup ) {
                this.NRadioGroup.checkRadio(this);
            }

            this.$emit('update:modelValue', this.tempChecked = true);
        },

        updateFromGroup()
        {
            let checked = this.NRadioGroup.isChecked(this.value);

            if ( this.tempChecked === checked ) {
                return;
            }
            
            this.$emit('update:modelValue', this.tempChecked = checked);
        }

    },

    renderRadio()
    {
        return (
            <div class="n-radio__radio">
                <span></span>
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
                { this.$slots.default() || this.$slots.label() }
            </div>
        );
    },

    render()
    {
        let classList = [
            'n-radio',
            'n-radio--' + this.size,
            'n-radio--' + this.type,
        ];

        if ( this.tempChecked ) {
            classList.push('n-checked');
        }

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        let props = Obj.clone(this.$attrs);

        if ( ! this.disabled ) {
            props.onMousedown = this.check;
        }

        return (
            <div class={classList} {...props}>
                { this.ctor('renderRadio')() }
                { this.ctor('renderLabel')() }
            </div>
        );
    }

}
