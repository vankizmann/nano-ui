import { UUID, Arr, Obj, Dom, Any, Locale, Event, Num } from "nano-js";
import Optiscroll from 'optiscroll';

export default {

    name: 'NScrollbar',

    provide()
    {
        return {
            NScrollbar: this
        };
    },

    props: {

        options: {
            default()
            {
                return {};
            },
            type: [Object]
        },

        relative: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        framerate: {
            default()
            {
                return 15;
            },
            type: [Number]
        },

        wrapClass: {
            default()
            {
                return 'n-scrollbar__wrap';
            }
        }

    },

    methods: {

        scrollTo(selector, offset = 0, delay = 100)
        {
            Any.delay(() => this.onScrollTo(selector, 
                offset), delay);
        },

        onScrollTo(selector, offset = 0)
        {
            let y = Dom.find(this.$refs.content).find(selector)
                .offset('top', this.$refs.content);

            this.optiscroll.scrollTo(0, y + offset, 0);
        },

        scrollIntoView(selector, offset = 0, delay = 100)
        {
            Any.delay(() => this.onScrollIntoView(selector), delay);
        },

        onScrollIntoView(selector)
        {
            this.optiscroll.scrollIntoView(selector, 0);
        },

        bindOptiscroll()
        {
            Optiscroll.globalSettings.
                checkFrequency = 250;

            Optiscroll.globalSettings.
                scrollMinUpdateInterval = 25;

            let options = {
                classPrefix: 'n-scrollbar-',
                minTrackSize: 15,
                forceScrollbars: true,
                autoUpdate: true,
                preventParentScroll: true,
                wrapContent: false,
            };

            this.optiscroll = new Optiscroll(this.$el, options);

            Any.delay(() => {
                Dom.find(this.$el).addClass('is-ready');
            }, 500);
        },

        unbindOptiscroll()
        {
            this.optiscroll.destroy();
        },

        adaptHeight()
        {
            let height = Dom.find(this.$refs.content)
                .child().height();

            let window = Dom.find(this.$el)
                .height();

            if ( height === this.passedHeight ) {
                return;
            }

            if ( window >= height ) {
                Dom.find(this.$el).addClass('is-fixed');
            }

            if ( window < height ) {
                Dom.find(this.$el).removeClass('is-fixed');
            }

            if ( window ) {
                this.passedHeight = height;
            }

            if ( ! this.relative ) {
                return;
            }

            Dom.find(this.$refs.spacer).child().css({
                height: height + 'px'
            });
        },

        bindAdaptHeight()
        {
            this.refresh = setInterval(this.adaptHeight, 
                1000 / this.framerate);
        },

        unbindAdaptHeight()
        {
            clearInterval(this.refresh);
        }

    },

    mounted()
    {
        this.bindAdaptHeight();
        this.bindOptiscroll();
    },

    beforeUnmount()
    {
        this.unbindAdaptHeight();
        this.unbindOptiscroll();
    },

    render()
    {
        let classList = [
            'n-scrollbar', 'is-fixed'
        ];

        return (
            <div class={classList} {...this.$attrs}>
                <div class="n-scrollbar-content" ref="content">
                    <div class={this.wrapClass}>
                        { this.$slots.default && this.$slots.default() }
                    </div>
                </div>
                <div class="n-scrollbar-spacer" ref="spacer">
                    <div class={this.wrapClass}>
                        { /* Adapt inner height */ }
                    </div>
                </div>
            </div>
        );
    }

}
