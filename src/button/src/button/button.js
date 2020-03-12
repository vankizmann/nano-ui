import { Obj, Any } from "nano-js";

export default {

    name: 'NButton',

    inheritAttrs: false,

    props: {

        icon: {
            default()
            {
                return null;
            }
        },

        iconPosition: {
            default()
            {
                return 'before';
            },
            type: [String]
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
                return 'default';
            },
            type: [String]
        },

        link: {
            default()
            {
                return this.type === 'link';
            },
            type: [Boolean]
        },

        square: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        round: {
            default()
            {
                return this.styles.round;
            },
            type: [Boolean]
        },

        plain: {
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

        buttonType: {
            default()
            {
                return 'button';
            },
            type: [String]
        },

        nativeType: {
            default()
            {
                return 'button';
            },
            type: [String]
        }

    },

    renderIcon()
    {
        if ( ! this.icon ) {
            return null;
        }

        let classList = [
            'n-icon',
            'n-icon--' + this.iconPosition,
            this.icon
        ];

        return (
            <span class={classList}></span>
        );
    },

    renderButton()
    {
        let classList = [
            'n-button',
            'n-button--' + this.size,
            'n-button--' + this.type,
        ];

        if ( this.icon ) {
            classList.push('n-button--icon');
        }

        if ( this.link ) {
            classList.push('n-button--link');
        }

        if ( this.square ) {
            classList.push('n-button--square');
        }

        if ( this.round ) {
            classList.push('n-button--round');
        }

        if ( this.plain ) {
            classList.push('n-button--plain');
        }

        let attrs = Obj.except(this.$attrs, [
            'class', 'style'
        ]);

        attrs.disabled = this.disabled;
        attrs.type = this.buttonType;

        let events = {};

        if ( ! this.disabled ) {
            events = Obj.assign({}, this.$listeners);
        }

        let props = {
            class: classList, attrs: attrs, on: events
        };

        return (
            this.$render(this.nativeType, props, [
                this.iconPosition === 'before' && this.ctor('renderIcon')(),
                this.$slots.default && (<span>{ this.$slots.default }</span>),
                this.iconPosition === 'after' && this.ctor('renderIcon')()
            ])
        );
    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-button__wrapper'
        ];

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        let attrs = Obj.only(this.$attrs, [
            'class', 'style'
        ]);

        return (
            <div class={classList} attrs={attrs}>
                { this.ctor('renderButton')() }
            </div>
        );
    }

}
