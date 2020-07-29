import { Arr, Any } from "nano-js";

export default {

    name: 'NRadioGroup',

    provide()
    {
        return {
            NRadioGroup: this
        };
    },

    props: {

        value: {
            default()
            {
                return null;
            }
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
            veValue: this.value,
            vRadios: []
        }
    },

    watch: {

        value()
        {
            if ( this.value !== this.veValue ) {
                this.veValue = this.value;
            }
        },

    },

    methods: {

        addRadio(radio)
        {
            Arr.add(this.vRadios, radio, {
                _uid: radio._uid
            });
        },

        removeRadio(radio)
        {
            Arr.remove(this.vRadios, {
                _uid: radio._uid
            });
        },

        checkRadio(radio)
        {
            this.$emit('input', this.veValue = radio.value);
        },

        isChecked(value)
        {
            return this.veValue === value;
        }

    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-radio-group',
            'n-radio-group--' + this.align
        ];

        return (
            <div class={classList}>
                {this.$slots.default}
            </div>
        );
    }

}
