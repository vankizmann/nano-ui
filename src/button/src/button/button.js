import { Nano } from "nano-js";

let { Obj, Any } = Nano;

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

        let icon = Any.isEmpty(this.icon) ?
            null : <span class={this.icon}></span>;

        let element = h('button', {
            class: className, domProps: domProps, on: events
        }, [icon, this.$slots.default && <span>{ this.$slots.default }</span>]);

        return <div class={['n-button__wrapper', this.disabled && 'n-disabled']}>
            { element }
        </div>;
    }

}
