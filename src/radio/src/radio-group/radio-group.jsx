import { Arr, Mix } from "@kizmann/pico-js";

export default {

    name: 'NRadioGroup',

    provide()
    {
        return {
            NRadioGroup: this
        };
    },

    props: {

        modelValue: {
            default()
            {
                return null;
            }
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

        align: {
            default()
            {
                return 'horizontal';
            },
            type: [String]
        }

    },

    data()
    {
        return {
            tempValue: this.modelValue,
            elements: []
        }
    },

    watch: {

        modelValue()
        {
            if ( this.modelValue !== this.tempValue ) {
                this.tempValue = this.modelValue;
            }
        },

    },

    methods: {

        addRadio(radio)
        {
            Arr.add(this.elements, radio, {
                uid: radio.uid
            });
        },

        removeRadio(radio)
        {
            Arr.remove(this.elements, {
                uid: radio.uid
            });
        },

        checkRadio(radio)
        {
            this.tempValue = radio.value;
            
            Arr.each(this.elements, (radio) => {
                radio.updateFromGroup();
            });

            this.$emit('update:modelValue', this.tempValue);
        },

        isChecked(value)
        {
            return this.tempValue === value;
        }

    },

    render()
    {
        let classList = [
            'n-radio-group',
            'n-radio-group--' + this.size,
            'n-radio-group--' + this.align,
        ];

        return (
            <div class={classList}>
                { this.$slots.default && this.$slots.default() }
            </div>
        );
    }

}
