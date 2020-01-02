import { Obj, Any } from "nano-js";

export default {

    name: 'NButton',

    props: {

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
                return 'left';
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
                return false;
            },
            type: [Boolean]
        },

        outline: {
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

    render(h)
    {
        let className = [
            'n-button', 'n-button--' + this.type, 'n-button--' + this.size
        ];

        if ( Any.isEmpty(this.icon) === false ) {
            className.push('n-button--icon');
        }

        if ( this.link === true ) {
            className.push('n-button--link');
        }

        if ( this.square === true ) {
            className.push('n-button--square');
        }

        if ( this.round === true ) {
            className.push('n-button--round');
        }

        if ( this.outline === true ) {
            className.push('n-button--outline');
        }

        if ( this.disabled === true ) {
            className.push('n-button--disabled');
        }

        let domProps = {
            type: this.nativeType,
            disabled: this.disabled
        };

        let events = {};

        if ( this.disabled === false ) {
            Obj.assign(events, this.$listeners)
        }

        let icon = null;

        if ( ! Any.isEmpty(this.icon) ) {
            icon = <span class={'n-icon n-icon--' + this.iconPosition + ' ' + this.icon}></span>
        }

        let element = h('button', {
            class: className, domProps: domProps, on: events
        }, [
            this.iconPosition === 'left' && icon,
            this.$slots.default && <span>{ this.$slots.default }</span>,
            this.iconPosition === 'right' && icon,
        ]);

        return <div class={['n-button__wrapper', this.disabled && 'n-disabled']}>
            { element }
        </div>;
    }

}
