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
                return '';
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
            'n-input', 'n-input--' + this.size
        ];

        if ( this.disabled === true ) {
            className.push('n-input--disabled');
        }

        if ( this.round === true ) {
            className.push('n-input--round');
        }

        if ( Any.isEmpty(this.icon) === false ) {
            className.push('n-input--icon');
        }

        let props = {
            value: this.nativeValue
        };

        let domProps = {
            value: this.nativeValue,
            type: this.nativeType,
            disabled: this.disabled,
            placeholder: this.placeholder
        };

        let events = Obj.assign({}, this.$listeners, {
            input: (event) => this.$emit('input', event.target.value)
        });

        let element = h('input', {
            class: className, props: props, domProps: domProps, on: events
        });

        let icon = null;

        let iconClick = () => {
            this.$emit('iconClick'); this.$emit('icon-click');
        };

        if ( Any.isEmpty(this.icon) === false ) {
            icon = (
                <NButton type="input" disabled={this.iconDisabled} vOn:click={iconClick}>
                    <span class={this.icon}></span>
                </NButton>
            );
        }

        return <div class={['n-input__wrapper', this.disabled && 'n-disabled']}>
            { [element, icon] }
        </div>;
    }

}
