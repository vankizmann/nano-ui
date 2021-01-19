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
                return 30;
            },
            type: [Number]
        },

        offset: {
            default()
            {
                return 10;
            }
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
        // this.bindOptiscroll();

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
        if ( this.passedHeight || this.passedWidth ) {
            Dom.find(this.$el).addClass('n-ready');
        }
    },

    beforeUnmount()
    {
        this.unbindAdaptHeight();
        this.unbindAdaptWidth();
        // this.unbindOptiscroll();

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
            this.$refs.content.scrollTop = y;
            this.$refs.content.scrollLeft = x;
        },

        scrollIntoView(selector, delay = 0)
        {
            Any.delay(() => this.onScrollIntoView(selector), 0);
        },

        onScrollIntoView(selector)
        {
            this.$refs.content.scrollTop = Dom.find(this.$el)
                .find(selector).offsetTop(this.$el);

            this.$refs.content.scrollLeft = Dom.find(this.$el)
                .find(selector).offsetLeft(this.$el);
        },

        adaptScrollHeight()
        {
            let outerHeight = this.$refs.content.
                clientHeight || 0;

            let innerHeight = this.$refs.content.
                scrollHeight || 0;

            let isSameOld = outerHeight === this.outerHeight && 
                innerHeight === this.innerHeight;

            if ( isSameOld ) {
                return;
            }

            this.outerHeight = outerHeight;
            this.innerHeight = innerHeight;

            let height = (outerHeight / innerHeight) 
                * outerHeight;

            let barHeight = Math.max(height, 50);

            let maxHeight = Math.ceil((outerHeight / innerHeight) * 
                (innerHeight - outerHeight));
        
            this.heightRatio = (maxHeight - (barHeight - height) 
                - this.offset) / maxHeight;

            Dom.find(this.$refs.vbar).css({
                height: (this.barHeight = Math.abs(barHeight)) + 'px'
            });

            if ( outerHeight && outerHeight < innerHeight ) {
                Dom.find(this.$el).addClass('has-vtrack');
            }

            if ( ! outerHeight || outerHeight >= innerHeight ) {
                Dom.find(this.$el).removeClass('has-vtrack');
            }
        },

        adaptScrollWidth()
        {
            let outerWidth = this.$refs.content.
                clientWidth || 0;

            let innerWidth = this.$refs.content.
                scrollWidth || 0;

            let isSameOld = outerWidth === this.outerWidth && 
                innerWidth === this.innerWidth;

            if ( isSameOld ) {
                return;
            }

            this.outerWidth = outerWidth;
            this.innerWidth = innerWidth;

            let width = (outerWidth / innerWidth) 
                * outerWidth;

            let barWidth = Math.max(width, 50);

            let maxWidth = Math.ceil((outerWidth / innerWidth) * 
                (innerWidth - outerWidth));
        
            this.widthRatio = (maxWidth - (barWidth - width) 
                - this.offset) / maxWidth;

            Dom.find(this.$refs.hbar).css({
                width: (this.barWidth = Math.abs(barWidth)) + 'px'
            });

            if ( outerWidth && outerWidth < innerWidth ) {
                Dom.find(this.$el).addClass('has-htrack');
            }

            if ( ! outerWidth || outerWidth >= innerWidth ) {
                Dom.find(this.$el).removeClass('has-htrack');
            }
        },

        adaptScrollPosition(scroll)
        {
            let isFirstRun = ! this.scrollTimer;

            if ( ! this.scrollTimer ) {
                this.scrollTimer = Date.now();
            }

            clearTimeout(this.scrollTimeout);

            if ( ! isFirstRun && Date.now() - this.scrollTimer < 32 ) {
                return this.scrollTimeout = setTimeout(() => 
                    this.adaptScrollPosition(scroll), 65);
            }

            this.scrollTimer = Date.now();

            let outerHeight = this.$refs.content.
                clientHeight || 0;

            let innerHeight = this.$refs.content.
                scrollHeight || 0;

            let top = Math.ceil((outerHeight / innerHeight) * 
                scroll.top * this.heightRatio);

            let outerWidth = this.$refs.content.
                clientWidth || 0;

            let innerWidth = this.$refs.content.
                scrollWidth || 0;

            let left = Math.ceil((outerWidth / innerWidth) * 
                scroll.left * this.widthRatio);

            this.updateScrollbars(top, left);
        },

        updateScrollbars(top, left)
        {
            Dom.find(this.$refs.vbar).css({
                transform: `translateY(${top}px)`
            });

            Dom.find(this.$refs.hbar).css({
                transform: `translateX(${left}px)`
            });
        },

        unbindOptiscroll()
        {
            // this.optiscroll.destroy();
        },

        adaptHeight()
        {
            let height = Dom.find(this.$refs.content)
                .child().height();

            let window = Dom.find(this.$el)
                .height();

            this.adaptScrollHeight(height);

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

            this.adaptScrollWidth();

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
            let scroll = {
                top: this.$refs.content.scrollTop,
                left: this.$refs.content.scrollLeft
            };
            
            this.adaptScrollPosition(scroll);

            this.$emit('scrollupdate', scroll.top, scroll.left);
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
        },

        onVbarMousedown(event)
        {
            Dom.find(document).on('mousemove', 
                this.onVbarMousemove, this._.uid);

            Dom.find(document).on('mouseup', 
                this.onVbarMouseup, this._.uid);

            this.scrollTop = this.$refs.content
                .scrollTop;

            this.clientY = event.clientY;
        },

        onVbarMousemove(event)
        {
            let rect = this.$refs.content.getBoundingClientRect();

            let top = (this.outerHeight / this.innerHeight) * 
                this.scrollTop * this.heightRatio;

            let offset = (event.clientY - this.clientY) + top;

            let height = (this.outerHeight - 
                    this.barHeight - this.offset);

            this.$refs.content.scrollTop = offset / height * 
                (this.innerHeight - this.outerHeight);
        },

        onVbarMouseup(event)
        {
            Dom.find(document).off('mousemove', 
                null, this._.uid);

            Dom.find(document).off('mouseup', 
                null, this._.uid);
        },

        onHbarMousedown(event)
        {
            Dom.find(document).on('mousemove', 
                this.onHbarMousemove, this._.uid);

            Dom.find(document).on('mouseup', 
                this.onHbarMouseup, this._.uid);

            this.scrollLeft = this.$refs.content
                .scrollLeft;

            this.clientX = event.clientX;
        },

        onHbarMousemove(event)
        {
            let rect = this.$refs.content.getBoundingClientRect();

            let top = (this.outerWidth / this.innerWidth) * 
                this.scrollLeft * this.widthRatio;

            let offset = (event.clientX - this.clientX) + top;

            let width = (this.outerWidth - 
                    this.barWidth - this.offset);

            this.$refs.content.scrollLeft = offset / width * 
                (this.innerWidth - this.outerWidth);
        },

        onHbarMouseup(event)
        {
            Dom.find(document).off('mousemove', 
                null, this._.uid);

            Dom.find(document).off('mouseup', 
                null, this._.uid);
        }

    },

    render()
    {
        let classList = [
            'n-scrollbar'
        ];

        let vbarProps = {
            onMousedown: this.onVbarMousedown
        };

        let hbarProps = {
            onMousedown: this.onHbarMousedown
        };

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
                <div ref="hbar" class="n-scrollbar-h" {...hbarProps}></div>
                <div ref="vbar" class="n-scrollbar-v" {...vbarProps}></div>
            </div>
        );
    }

}
