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
        },

        minTime: {
            default()
            {
                return 1000;
            },
            type: [Number]
        }

    },

    data()
    {
        return {
            veVisible: this.visible, veTiming: Date.now()
        };
    },

    methods: {

        startTimer()
        {
            this.veTiming = Date.now();
        },

        stopTimer()
        {
            let timing = Date.now() - this.veTiming;

            if ( timing < this.minTime ) {
                return Any.delay(this.stopTimer, this.minTime - timing + 10);
            }

            this.veVisible = this.visible;
        }

    },

    watch: {

        visible()
        {
            this.visible ? this.startTimer() : this.stopTimer();
        }

    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-loader', 'n-loader--' + this.size
        ];

        let parentVisible = this.NLoader &&
            this.NLoader.veVisible;

        if ( this.veVisible && ! parentVisible ) {
            classList.push('n-loader--active');
        }

        return (
            <div class={classList}>
                { this.$slots.default }
            </div>
        );
    }
}
