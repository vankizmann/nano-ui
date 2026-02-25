import { Num, Arr, Obj, Mix } from "@kizmann/pico-js";

export default {

    name: 'NSelectOption',

    inheritAttrs: false,

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

        label: {
            default()
            {
                return null;
            }
        },

        valueProp: {
            default()
            {
                return null;
            }
        },

        labelProp: {
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

        tempValue()
        {
            if ( Mix.isEmpty(this.valueProp) ) {
                return this.value;
            }

            return Obj.get(this.value, this.valueProp);
        },

        tempLabel()
        {
            if ( Mix.isEmpty(this.labelProp) ) {
                return this.label;
            }

            return Obj.get(this.value, this.labelProp);
        }

    },

    mounted()
    {
        if ( ! this.NSelect.lazy ) {
            this.NSelect.addOption(this);
        }
    },

    beforeUnmount()
    {
        if ( ! this.NSelect.lazy ) {
            this.NSelect.removeOption(this);
        }
    },

    methods: {

        toggleItem(event) 
        {
            event.preventDefault();

            if ( event.which !== 1 ) {
                return;
            }

            if ( this.disabled ) {
                return;
            }

            this.NSelect.toggleOption(this.tempValue, 
                event);
        },

    },

    renderOption(index)
    {

        let classList = [];

        let isMultipleActive = this.NSelect.multiple && 
            Arr.has(this.NSelect.tempValue, this.tempValue);

        if ( isMultipleActive ) {
            classList.push('n-active');
        }

        let isSingleActive = ! this.NSelect.multiple && 
            this.NSelect.tempValue === this.tempValue;

        if ( isSingleActive ) {
            classList.push('n-active');
        }

        if ( this.NSelect.index === Mix.int(index) ) {
            classList.push('n-focus');
        }

        let props = {
            'disabled': this.disabled,
            'onMousedown': this.toggleItem,
            'type': this.NSelect.type,
            'clickClose': ! this.NSelect.multiple,
        };

        if ( isSingleActive || isMultipleActive ) {
            props.icon = nano.Icons.checked;
        }

        // Required for scrolldown
        props['data-option'] = this._.uid;

        return (
            <NPopoverOption class={classList} {...props}>
                { this.$slots.default && this.$slots.default() || this.tempLabel }
            </NPopoverOption>
        );
    },

    render()
    {
        return null;
    }

}
