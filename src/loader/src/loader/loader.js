import { UUID, Num, Obj, Any, Locale } from "nano-js";

export default {

    name: 'NLoader',

    model: {
        prop: 'visible'
    },

    inject: {

        NLoader: {
            default: undefined
        }

    },

    provide()
    {
        return {
            NLoader: this
        };
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

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-loader', 'n-loader--' + this.size
        ];

        let parentVisible = this.NLoader &&
            this.NLoader.visible;

        if ( this.visible && ! parentVisible ) {
            classList.push('n-loader--active');
        }

        return (
            <div class={classList}>
                { this.$slots.default }
            </div>
        );
    }
}
