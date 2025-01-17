import { h } from "vue";
import { Obj } from "@kizmann/pico-js";

export default {

    name: 'NInput',

    inject: {

        NForm: {
            default: undefined
        },

        NFormItem: {
            default: undefined
        }

    },

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
                return null;
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

    computed: {

        deepDisabled() {
            return this.NFormItem ? this.NFormItem.disabled(this.disabled) :
                this.disabled;
        }

    },

    data()
    {
        return {
            focus: false, tempValue: this.modelValue || ''
        };
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

        onIconClick(event)
        {
            if ( event.clientX || event.clientY ) {
                this.$emit('icon-click', event);
            }
        },

        onInput(event)
        {
            this.$emit('update:modelValue',
                this.tempValue = event.target.value);
        },

        onKeydown(event)
        {
            this.$emit('keydown', event);

            if ( event.which !== 13 ) {
                return;
            }

            event.preventDefault();

            if ( ! this.NForm ) {
                return;
            }

            this.NForm.onSubmit(event);
        },

        onFocus(event)
        {
            this.focus = true;
            this.$emit('focus', event);
        },

        onBlur(event)
        {
            this.focus = false;
            this.$emit('blur', event);
        }

    },

    renderIcon()
    {
        if ( !this.icon ) {
            return null;
        }

        let disabled = this.deepDisabled;

        if ( this.iconDisabled !== null ) {
            disabled = this.iconDisabled;
        }

        let props = {
            type: 'input',
            icon: this.icon,
            size: this.size,
            square: true,
            disabled: disabled,
        };

        if ( !disabled ) {
            props.onClick = this.onIconClick;
        }

        return (<NButton {...props} />);
    },

    renderInput()
    {
        let props = Obj.except(this.$attrs, [
            'class', 'style'
        ]);

        Obj.assign(props, {
            value: this.tempValue,
            type: this.nativeType,
            disabled: this.deepDisabled,
            placeholder: this.placeholder,
            onInput: this.onInput,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onKeydown: this.onKeydown
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

        if ( this.deepDisabled ) {
            classList.push('n-disabled');
        }

        if ( this.focus ) {
            classList.push('n-focus');
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
