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

        scrollTo(x = 0, y = 0, delay = 100)
        {
            Any.delay(() => this.onScrollTo(x, y), delay);
        },

        onScrollTo(x = 0, y = 0)
        {
            this.optiscroll.scrollTo(x, y, 0);
        },

        scrollIntoView(selector, delay = 100)
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

            if ( window ) {
                this.passedHeight = height;
            }

            if ( ! this.relative ) {
                return Any.delay(this.onSizechange, 100);
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
        },

        onScroll(event)
        {
            let scrollTop = this.$refs.content
                .scrollTop;

            this.$emit('scrollupdate', scrollTop);
        },

        onSizechange(event)
        {
            let height = Dom.find(this.$el).height();

            if ( this.passedHeight ) {
                Dom.find(this.$el).addClass('is-ready');
            }

            this.$emit('sizechange', height);
        },

    },

    mounted()
    {
        this.bindAdaptHeight();
        this.bindOptiscroll();

        Dom.find(this.$el).on('sizechange', 
            this.onSizechange, this._.uid);

        Dom.find(this.$el).on('scroll', 
            this.onScroll, this._.uid);
    },

    beforeUnmount()
    {
        this.unbindAdaptHeight();
        this.unbindOptiscroll();

        Dom.find(this.$el).off('sizechange', 
            null, this._.uid);

        Dom.find(this.$el).off('scroll', 
            null, this._.uid);
    },

    render()
    {
        let classList = [
            'n-scrollbar'
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
