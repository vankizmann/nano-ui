import { h } from "vue";
import {Obj, Mix, Hash} from "@kizmann/pico-js";

export default {

    name: 'NTextarea',

    inheritAttrs: false,

    props: {

        modelValue: {
            default()
            {
                return null;
            }
        },

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        placeholder: {
            default()
            {
                return '';
            },
            type: [String]
        },

        autoRows: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        maxRows: {
            default()
            {
                return 12;
            },
            type: [Number]
        },

        minRows: {
            default()
            {
                return 4;
            },
            type: [Number]
        },

        maxLength: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

    },

    watch: {

        modelValue(value)
        {
            if ( value !== this.tempValue ) {
                this.tempValue = value;
            }
        }

    },

    methods: {

        eventInput(event)
        {
            this.$emit('update:modelValue', 
                this.tempValue = event.target.value);
        }

    },

    data()
    {
        return {
            tempValue: this.modelValue || ''
        };
    },

    renderInput()
    {
        let props = Obj.except(this.$attrs, ['class', 'style']);

        Obj.assign(props, {
            value:          this.tempValue,
            rows:           this.minRows,
            disabled:       this.disabled,
            placeholder:    this.placeholder,
            onInput:        this.eventInput,
        });

        if ( this.maxLength !== 0 ) {
            props.maxLength = this.maxLength;
        }

        let currentRows = (this.tempValue.match(/\n/g) || []).length + 1;

        if ( this.autoRows && props.rows < currentRows ) {
            props.rows = currentRows <= this.maxRows ? currentRows : this.maxRows;
        }

        return h('textarea', props);
    },

    render()
    {
        let classList = [
            'n-textarea',
            'n-textarea--' + this.size,
            'n-textarea--' + this.type,
        ];

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        let props = Obj.only(this.$attrs, ['style'], {
            class: this.cmer(classList)
        });

        return h('div', props, [this.ctor('renderInput')()]);
    }

}
