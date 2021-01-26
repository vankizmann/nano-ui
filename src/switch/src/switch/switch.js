import { Obj, Any } from "@kizmann/pico-js";

export default {

    name: 'NSwitch',

    props: {

        modelValue: {
            default()
            {
                return false;
            }
        },

        onValue: {
            default()
            {
                return true;
            }
        },

        offValue: {
            default()
            {
                return false;
            }
        },

        onType: {
            default()
            {
                return 'primary';
            }
        },

        offType: {
            default()
            {
                return 'default';
            }
        },

        size: {
            default()
            {
                return 'md';
            }
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

    },

    data()
    {
        return {
            tempValue: this.modelValue
        };
    },

    methods: {

        eventClick()
        {
            let tempValue = this.onValue;

            if ( this.tempValue === this.onValue ) {
                tempValue = this.offValue;
            }

            this.$emit('input', this.tempValue = tempValue);
        }

    },

    watch: {

        modelValue()
        {
            if ( this.modelValue !== this.tempValue ) {
                this.tempValue = this.modelValue;
            }
        }

    },

    renderSwitch()
    {
        let classList = [
            'n-switch__switch'
        ];

        let props = {};

        if ( ! this.disabled ) {
            props.onMousedown = this.eventClick;
        }

        return (
            <div class={classList} {...props}>
                <span></span>
            </div>
        )
    },

    renderLabel()
    {
        if ( ! this.$slots.default ) {
            return null;
        }

        let classList = [
            'n-switch__label',
        ];

        let props = {};

        if ( ! this.disabled ) {
            props.onMousedown = this.eventClick;
        }

        return (
            <div class={classList} {...props}>
                { this.$slots.default() }
            </div>
        )
    },

    render()
    {
        let classList = [
            'n-switch',
            'n-switch--' + this.size
        ];

        if ( this.tempValue === this.onValue ) {
            classList.push('n-switch--' + this.onType);
        }

        if ( this.tempValue === this.offValue) {
            classList.push('n-switch--' + this.offType);
        }

        if ( this.tempValue === this.onValue ) {
            classList.push('n-on');
        }

        if ( this.tempValue === this.offValue ) {
            classList.push('n-off');
        }

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                { this.ctor('renderSwitch')() }
                { this.ctor('renderLabel')() }
            </div>
        );
    }

}
