import {Obj, Any, UUID} from "nano-js";

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
            if ( this.value !== this.veValue ) {
                this.veValue = value;
            }
        }

    },

    methods: {

        eventInput(event)
        {
            this.$emit('input', event.target.value);
        }

    },

    data()
    {
        return {
            veValue: this.value || ''
        };
    },

    renderInput()
    {
        let classList = [
            'n-textarea',
            'n-textarea--' + this.size
        ];

        let attrs = {
            value: this.veValue,
            rows: this.minRows,
            disabled: this.disabled,
            placeholder: this.placeholder
        };

        if ( this.maxLength !== 0 ) {
            attrs.maxLength = this.maxLength;
        }

        let currentRows = (this.veValue.match(/\n/g) || []).length + 1;

        if ( this.autoRows && attrs.rows < currentRows ) {
            attrs.rows = currentRows <= this.maxRows ? currentRows : this.maxRows;
        }

        let events = Obj.clone(this.$listeners);

        // Override input event
        events.input = this.eventInput;

        return (
            <textarea value={this.veValue} class={classList} attrs={attrs} on={events} />
        );
    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-textarea__wrapper'
        ];

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                { this.ctor('renderInput')() }
            </div>
        );
    }

}
