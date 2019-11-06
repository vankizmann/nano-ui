import { Nano } from "nano-js";

let { Obj, Any } = Nano;

export default {

    name: 'NTextarea',

    props: {

        value: {
            default()
            {
                return null;
            }
        },

        size: {
            default()
            {
                return 'default';
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

        value(value)
        {
            this.nativeValue = value;
        }

    },

    methods: {

    },

    data()
    {
        return {
            nativeValue: this.value || ''
        };
    },

    render(h)
    {
        let className = [
            'n-textarea', 'n-textarea--' + this.size
        ];

        if ( this.disabled === true ) {
            className.push('n-textarea--disabled');
        }

        if ( Any.isEmpty(this.icon) === false ) {
            className.push('n-textarea--icon');
        }

        let props = {
            value: this.nativeValue
        };

        let domProps = {
            value: this.nativeValue,
            rows: this.minRows,
            disabled: this.disabled,
            placeholder: this.placeholder
        };

        if ( this.maxLength !== 0 ) {
            domProps.maxLength = this.maxLength;
        }

        let currentRows = (this.nativeValue.match(/\n/g) ||
            []).length + 1;

        if ( this.autoRows === true && domProps.rows < currentRows ) {
            domProps.rows = currentRows <= this.maxRows ? currentRows : this.maxRows;
        }

        let events = Obj.assign({}, this.$listeners, {
            input: (event) => this.$emit('input', event.target.value)
        });

        let element = h('textarea', {
            class: className, props: props, domProps: domProps, on: events
        });

        return <div class={['n-textarea__wrapper', this.disabled && 'n-disabled']}>
            { element }
        </div>;
    }

}
