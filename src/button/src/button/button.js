import { Obj, Any } from "nano-js";

export default {

    name: 'NButton',

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

        let attrs = {
            type: this.nativeType,
            disabled: this.disabled
        };

        let events = {};

        if ( ! this.disabled ) {
            events = Obj.assign({}, this.$listeners);
        }

        return (
            <button class={classList} attrs={attrs} on={events}>
                { this.iconPosition === 'before' && this.ctor('renderIcon')() }
                { this.$slots.default && <span>{ this.$slots.default }</span> }
                { this.iconPosition === 'after' && this.ctor('renderIcon')() }
            </button>
        )
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

        return (
            <div class={classList}>
                { this.ctor('renderButton')() }
            </div>
        );
    }

}
