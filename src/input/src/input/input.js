import { UUID, Num, Obj, Any, Locale } from "nano-js";

export default {

    name: 'NInput',

    props: {

        value: {
            default()
            {
                return null;
            }
        },

        icon: {
            default()
            {
                return null;
            }
        },

        iconPosition: {
            default()
            {
                return 'after';
            },
            type: [String]
        },

        iconDisabled: {
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

        nativeType: {
            default()
            {
                return 'text';
            },
            type: [String]
        },

        round: {
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

        placeholder: {
            default()
            {
                return '';
            },
            type: [String]
        }

    },

    watch: {

        value()
        {
            if ( this.value !== this.veValue ) {
                this.veValue = this.value;
            }
        }

    },

    methods: {

        eventIconClick(event)
        {
            this.$emit('icon-click', event);
        },

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

    renderIcon()
    {
        if ( ! this.icon ) {
            return null;
        }

        let events = {
            click: this.eventIconClick
        };

        let props = {
            type: 'input',
            icon: this.icon,
            disabled: this.iconDisabled,
        };

        return (
            <NButton props={props} on={events} />
        );
    },

    renderInput()
    {
        let classList = [
            'n-input',
            'n-input--' + this.size
        ];

        if ( this.round ) {
            classList.push('n-input--round');
        }

        if ( this.icon ) {
            classList.push('n-input--icon');
            classList.push('n-input--icon-' + this.iconPosition);
        }

        let attrs = {
            value: this.veValue,
            type: this.nativeType,
            disabled: this.disabled,
            placeholder: this.placeholder
        };

        let events = {};

        if ( ! this.disabled ) {
            events = Obj.assign({}, this.$listeners);
        }

        events.input = this.eventInput;

        return (
            <input class={classList} attrs={attrs} on={events} />
        )
    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-input__wrapper'
        ];

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                { this.iconPosition === 'before' && this.ctor('renderIcon')() }
                { this.ctor('renderInput')() }
                { this.iconPosition === 'after' && this.ctor('renderIcon')() }
            </div>
        );
    }

}
