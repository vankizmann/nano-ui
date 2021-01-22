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

        fixture: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        framerate: {
            default()
            {
                return 5;
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

    mounted()
    {
        this.bindAdaptHeight();
        this.bindAdaptWidth();
        this.bindOptiscroll();

        Event.bind('NScrollbar:resize',
            this.onResize, this._.uid);

        Event.bind('NResizer:moved',
            this.onUpdate, this._.uid);

        Dom.find(window).on('resize', 
            this.onResize, this._.uid);

        Dom.find(this.$el).on('sizechange', 
            this.onSizechange, this._.uid);

        Dom.find(this.$el).on('scroll', 
            this.onScroll, this._.uid);
    },

    updated()
    {
        if ( this.optiscroll ) {
            Dom.find(this.$el).addClass('is-enabled');
        }

        if ( this.passedHeight || this.passedWidth ) {
            Dom.find(this.$el).addClass('is-ready');
        }
    },

    beforeUnmount()
    {
        this.unbindAdaptHeight();
        this.unbindAdaptWidth();
        this.unbindOptiscroll();

        Event.unbind('NScrollbar:resize', 
            this._.uid);

        Event.unbind('NResizer:moved', 
            this._.uid);

        Dom.find(window).off('resize', 
            null, this._.uid);

        Dom.find(this.$el).off('sizechange', 
            null, this._.uid);

        Dom.find(this.$el).off('scroll', 
            null, this._.uid);
    },

    methods: {

        scrollTo(x = 0, y = 0, delay = 0)
        {
            Any.delay(() => this.onScrollTo(x, y), delay);
        },

        onScrollTo(x = 0, y = 0)
        {
            this.optiscroll.scrollTo(x, y, 0);
        },

        scrollIntoView(selector, delay = 200)
        {
            Any.delay(() => this.onScrollIntoView(selector), delay);
        },

        onScrollIntoView(selector)
        {
            this.optiscroll.scrollIntoView(selector, 0);
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

            let style = {
                height: height + 'px'
            };

            if ( this.fixture ) {
                Dom.find(this.$refs.content).child().css(style);
            }

            if ( ! this.relative ) {
                return Any.delay(this.onSizechange, 100);
            }

            Dom.find(this.$refs.spacer).child().css(style);
        },

        bindAdaptHeight()
        {
            this.refreshHeight = setInterval(this.adaptHeight, 
                1000 / this.framerate);
        },

        unbindAdaptHeight()
        {
            clearInterval(this.refreshHeight);
        },

        adaptWidth()
        {
            if ( this.resizeTimer ) {
                return;
            }

            let width = Dom.find(this.$refs.content)
                .child().width();

            let window = Dom.find(this.$el)
                .width();

            if ( width === this.passedWidth ) {
                return;
            }

            if ( window ) {
                this.passedWidth = width;
            }

            let style = {
                width: width + 'px'
            };

            if ( this.fixture ) {
                this.onUpdate();
            }

            if ( ! this.relative ) {
                return Any.delay(this.onSizechange, 100);
            }

            Dom.find(this.$refs.spacer).child().css(style);
        },

        bindAdaptWidth()
        {
            this.refreshWidth = setInterval(this.adaptWidth, 
                1000 / this.framerate);
        },

        unbindAdaptWidth()
        {
            clearInterval(this.refreshWidth);
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

            if ( this.passedHeight || this.passedWidth ) {
                Dom.find(this.$el).addClass('is-ready');
            }

            this.$emit('sizechange', height);
        },

        onResize(event)
        {
            if ( ! this.fixture ) {
                return;
            }

            Dom.find(this.$refs.content)
                .child().css(null);

            clearTimeout(this.resizeTimer);

            this.resizeTimer = setTimeout(
                this.onUpdate, 500);
            
            Dom.find(this.$el).fire('resized');
        },

        onUpdate()
        {
            if ( ! this.fixture ) {
                return;
            }

            let $child = Dom.find(this.$refs.content)
                .child();

            let height = $child.actual(() => {
                return $child.scrollHeight();
            });

            if ( height !== this.passedHeight ) {
                $child.css({ height: height + 'px' });
            }

            let width = $child.actual(() => {
                return $child.scrollWidth();
            });

            if ( width !== this.passedWidth ) {
                $child.css({ width: width + 'px' });
            }

            delete this.resizeTimer;
        }

    },

    render()
    {
        let classList = [
            'n-scrollbar'
        ];

        return (
            <div class={classList} {...Obj.except(this.$attrs, ['class'])}>
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
