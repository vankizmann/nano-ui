import { h } from "vue";
import { Obj, Any } from "nano-js";

export default {

    name: 'NButton',

    props: {

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

        link: {
            default()
            {
                return false;
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

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
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
                return 'before';
            },
            type: [String]
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
        ];

        classList.push(this.icon);

        return (<i class={classList}></i>);
    },

    render()
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

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        let events = {};

        if ( ! this.disabled ) {
            events = Obj.assign({}, this.$listeners);
        }

        let attrs = {};

        if ( this.disabled ) {
            attrs.disabled = true;
        }

        let props = {
            class: classList, attrs: attrs, on: events
        };

        let innerHtml = [];

        if ( this.iconPosition === 'before' ) {
            innerHtml.push(this.ctor('renderIcon')());
        }

        if ( this.$slots.default ) {
            innerHtml.push(<span>{ this.$slots.default() }</span>);
        }

        if ( this.iconPosition === 'after' ) {
            innerHtml.push(this.ctor('renderIcon')());
        }

        return h(this.nativeType, props, innerHtml);
    }

}
