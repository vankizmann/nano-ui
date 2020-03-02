import { UUID, Num, Obj, Any, Dom, Locale } from "nano-js";

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

            Dom.find(this.$el).addClass('n-active');
        },

        stopTimer()
        {
            let timing = Date.now() - this.veTiming;

            if ( timing < this.minTime ) {
                return Any.delay(this.stopTimer, this.minTime - timing + 10);
            }

            Dom.find(this.$el).removeClass('n-active');
        }

    },

    watch: {

        visible()
        {
            this.visible ? this.startTimer() : this.stopTimer();
        }

    },

    mounted()
    {
        this.veVisible ? this.startTimer() : this.stopTimer();
    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-loader', 'n-loader--' + this.size
        ];

        return (
            <div class={classList}>
                { this.$slots.default }
            </div>
        );
    }
}
