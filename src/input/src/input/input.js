import { h } from "vue";
import { Obj } from "nano-js";

export default {

    name: 'NInput',

    inheritAttrs: false,

    props: {

        value: {
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
                return 'md';
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
            type:       'input',
            icon:       this.icon,
            size:       this.size,
            square:     true,
            disabled:   this.iconDisabled,
        };

        return (<NButton props={props} on={events} />);
    },

    renderInput()
    {
        let props = Obj.except(this.$attrs, ['class', 'style']);

        Obj.assign(props, {
            value:          this.veValue,
            type:           this.nativeType,
            disabled:       this.disabled,
            placeholder:    this.placeholder,
            onInput:        this.eventInput
        })

        if ( this.disabled ) {
            props.disabled = true;
        }

        let events = {
        };

        if ( ! this.disabled ) {
            events = Obj.assign({}, this.$listeners);
        }

        return (
            <input value={this.veValue} {...props} />
        );
    },

    render()
    {
        let classList = [
            'n-input',
            'n-input--' + this.size,
            'n-input--' + this.type,
        ];

        if ( this.icon ) {
            classList.push('n-input--icon');
            classList.push('n-input--icon-' + this.iconPosition);
        }

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        let props = Obj.only(this.$attrs, ['style'], {
            class: this.cmer(classList)
        });

        let innerHtml = [];

        if ( this.iconPosition === 'before' ) {
            innerHtml.push(this.ctor('renderIcon')());
        }

        innerHtml.push(this.ctor('renderInput')());

        if ( this.iconPosition === 'after' ) {
            innerHtml.push(this.ctor('renderIcon')());
        }

        return h('div', props, innerHtml);
    }

}
