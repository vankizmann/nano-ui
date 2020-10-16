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

        minimum: {
            default()
            {
                return 300;
            },
            type: [Number]
        },

        debounce: {
            default()
            {
                return 500;
            },
            type: [Number]
        }

    },

    data()
    {
        return {
            veTiming: 0
        };
    },

    methods: {

        startTimer()
        {
            clearTimeout(this.veDelay);

            this.veTiming = Date.now();

            Dom.find(this.$el).addClass('n-active');
        },

        stopTimer()
        {
            let timing = Date.now() - this.veTiming;

            if ( timing < this.minimum ) {
                return Any.delay(this.stopTimer, this.minimum - timing + 10);
            }

            this.veDelay = setTimeout(() => {
                Dom.find(this.$el).removeClass('n-active');
            }, this.debounce);
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
        this.visible ? this.startTimer() : this.stopTimer();
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
