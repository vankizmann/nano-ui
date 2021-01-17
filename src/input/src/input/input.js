import { h } from "vue";
import { Obj } from "nano-js";

export default {

    name: 'NInput',

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

        icon: {
            default()
            {
                return '';
            },
            type: [String]
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

        modelValue(value)
        {
            if ( value !== this.tempValue ) {
                this.tempValue = value;
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

    renderIcon()
    {
        if ( ! this.icon ) {
            return null;
        }

        let disabled = this.disabled || 
            this.iconDisabled;

        let props = {
            type:       'input',
            icon:       this.icon,
            size:       this.size,
            square:     true,
            disabled:   disabled,
            onClick:    this.eventIconClick,
        };

        return (<NButton {...props} />);
    },

    renderInput()
    {
        let props = Obj.except(this.$attrs, ['class', 'style']);

        Obj.assign(props, {
            value:          this.tempValue,
            type:           this.nativeType,
            disabled:       this.disabled,
            placeholder:    this.placeholder,
            onInput:        this.eventInput
        });

        return h('input', props);
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
            class: classList
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
