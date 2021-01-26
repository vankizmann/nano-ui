import { UUID, Num, Obj, Any, Dom, Locale } from "@kizmann/pico-js";

export default {

    name: 'NLoader',

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
                return 'md';
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
                return 100;
            },
            type: [Number]
        }

    },

    data()
    {
        return {
            tempVisible: this.visible
        };
    },

    methods: {

        applyTimer()
        {
            this.timing = Date.now();

            if ( this.visible) {
                return this.tempVisible = this.visible;
            }

            this.startTimer();
        },

        startTimer()
        {
            let timing = Date.now() - this.timing;

            if ( timing < this.minimum ) {
                return this.restartTimer(timing);
            }

            this.timeout = setTimeout(() => this.tempVisible = false, 
                this.debounce);
        },

        restartTimer(timing = 0) {
            Any.delay(this.startTimer, this.minimum - timing + 10);
        }

    },

    watch: {

        visible()
        {
            this.applyTimer();
        }

    },

    mounted()
    {
        this.applyTimer();
    },

    render()
    {
        let classList = [
            'n-loader', 
            'n-loader--' + this.size, 
            'n-loader--' + this.type
        ];

        if ( this.tempVisible ) {
            classList.push('n-load');
        }

        return (
            <div class={classList}>
                { this.$slots.default && this.$slots.default() }
            </div>
        );
    }
}
