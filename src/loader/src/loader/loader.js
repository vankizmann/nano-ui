import { UUID, Num, Obj, Any, Locale } from "nano-js";

export default {

    name: 'NLoader',

    inject: {

        NLoader: {
            default: undefined
        }

    },

    model: {
        prop: 'visible'
    },

    props: {

        visible: {
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
        }

    },

    provide()
    {
        return {
            NLoader: this
        };
    },

    render(h)
    {
        let className = [
            'n-loader', 'n-loader--' + this.size
        ];

        let parentVisible = this.NLoader !== undefined &&
            this.NLoader.visible === true;

        if ( this.visible === true && parentVisible === false ) {
            className.push('n-loader--active');
        }

        return (
            <div class={className}>
                { this.$slots.default }
            </div>
        );
    }
}
