import { UUID, Arr, Obj, Dom, Any, Str, Locale, Event, Num } from "nano-js";
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

        overflowY: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        overflowX: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        offsetY: {
            default()
            {
                return 10;
            },
            type: [Number]
        },

        offsetX: {
            default()
            {
                return 10;
            },
            type: [Number]
        },

        framerate: {
            default()
            {
                return 30;
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

    computed: {

        touch() {
            return !! ('ontouchstart' in window || 
                navigator.msMaxTouchPoints);
        },

        mousedown() {
            return this.touch ? 'touchstart' :
                'mousedown';
        },

        mousemove() {
            return this.touch ? 'touchmove' :
                'mousemove';
        },

        mouseup() {
            return this.touch ? 'touchend' :
                'mouseup';
        },

        balanceHbar()
        {
            return this.$refs.content.clientHeight !==
                this.$refs.content.offsetHeight;
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
            let offsetHeight = this.$refs.content.clientHeight -
                this.$refs.content.offsetHeight;

            let offsetWidth = this.$refs.content.clientWidth -
                this.$refs.content.offsetWidth;

            let outerHeight = this.$refs.content.
                clientHeight|| 0;
            
            if ( offsetHeight === 0 && this.overflowX ) {
                outerHeight -= 15;
            }

            let innerHeight = this.$refs.content
                .scrollHeight || 0;

            if ( offsetHeight === 0 && this.overflowX ) {
                innerHeight -= 15;
            }

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
                - this.offsetY) / maxHeight;

            window.requestAnimationFrame(() => {

                Dom.find(this.$refs.vbar).css({
                    height: (this.barHeight = Math.ceil(barHeight)) + 'px'
                });

                if ( offsetWidth !== 0 && this.overflowY ) {
                    Dom.find(this.$el).addClass('has-native-vbar');
                }
    
                if ( outerHeight && outerHeight < innerHeight) {
                    Dom.find(this.$el).addClass('has-vtrack');
                }
    
                if ( ! outerHeight || outerHeight >= innerHeight ) {
                    Dom.find(this.$el).removeClass('has-vtrack');
                }

            });

            this.adaptScrollPosition();
        },

        adaptScrollWidth()
        {
            let offsetWidth = this.$refs.content.clientWidth -
                this.$refs.content.offsetWidth;

            let offsetHeight = this.$refs.content.clientHeight -
                this.$refs.content.offsetHeight;

            let outerWidth = this.$refs.content.
                clientWidth || 0;
                
            if ( offsetWidth === 0 && this.overflowY ) {
                outerWidth -= 15;
            }

            let innerWidth = this.$refs.content
                .scrollWidth || 0;

            if ( offsetWidth === 0 && this.overflowY ) {
                innerWidth -= 15;
            }

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
                - this.offsetX) / maxWidth;

            window.requestAnimationFrame(() => {

                Dom.find(this.$refs.hbar).css({
                    width: (this.barWidth = Math.ceil(barWidth)) + 'px'
                });
        
                if ( offsetHeight && this.overflowX ) {
                    Dom.find(this.$el).addClass('has-native-hbar');
                }
    
                if ( outerWidth && outerWidth < innerWidth ) {
                    Dom.find(this.$el).addClass('has-htrack');
                }
    
                if ( ! outerWidth || outerWidth >= innerWidth ) {
                    Dom.find(this.$el).removeClass('has-htrack');
                }

            });

            this.adaptScrollPosition();
        },

        adaptScrollPosition(scroll = {})
        {
            let isFirstRun = ! this.scrollTimer;

            if ( ! this.scrollTimer ) {
                this.scrollTimer = Date.now();
            }

            clearTimeout(this.scrollTimeout);

            if ( ! isFirstRun && Date.now() - this.scrollTimer < 1000 / this.framerate ) {
                return this.scrollTimeout = setTimeout(() => 
                    this.adaptScrollPosition(scroll), (1000 / this.framerate) + 50);
            }

            if ( ! scroll.top ) {
                scroll.top = this.$refs.content.scrollTop;
            }

            if ( ! scroll.left ) {
                scroll.left = this.$refs.content.scrollLeft;
            }

            this.scrollTimer = Date.now();

            let offsetHeight = this.$refs.content.clientHeight -
                this.$refs.content.offsetHeight;

            let offsetWidth = this.$refs.content.clientWidth -
                this.$refs.content.offsetWidth;

            let outerHeight = this.$refs.content.
                clientHeight || 0;

            if ( offsetHeight === 0 && this.overflowX ) {
                outerHeight -= 15;
            }

            let innerHeight = this.$refs.content.
                scrollHeight || 0;

            if ( offsetHeight === 0 && this.overflowX ) {
                innerHeight -= 15;
            }

            let top = Math.ceil((outerHeight / innerHeight) * 
                scroll.top * this.heightRatio);

            let outerWidth = this.$refs.content.
                clientWidth || 0;

            if ( offsetWidth === 0 && this.overflowY ) {
                outerWidth -= 15;
            }

            let innerWidth = this.$refs.content.
                scrollWidth || 0;

            if ( offsetWidth === 0 && this.overflowY ) {
                innerWidth -= 15;
            }
            
            let left = Math.ceil((outerWidth / innerWidth) * 
                scroll.left * this.widthRatio);

            window.requestAnimationFrame(() => 
                this.updateScrollbars(top, left));
        },

        updateScrollbars(top, left)
        {
            Dom.find(this.$refs.vbar).css({
                transform: `translateY(${top||0}px)`
            });

            Dom.find(this.$refs.hbar).css({
                transform: `translateX(${left||0}px)`
            });
        },

        adaptHeight()
        {
            let height = Dom.find(this.$refs.content)
                .child().height();

            let window = Dom.find(this.$el)
                .innerHeight();

            if ( this.overflowY ) {
                this.adaptScrollHeight();
            }

            if ( height === this.passedHeight ) {
                return;
            }

            let offsetHeight = this.$refs.content.clientHeight -
                this.$refs.content.offsetHeight;

            if ( window ) {
                this.passedHeight = height;
            }

            if ( offsetHeight === 0 && this.touch ) {
                height -= 15;
            }

            let style = {
                height: (height + 1) + 'px'
            };

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
                .innerWidth();

            if ( width === this.passedWidth ) {
                return;
            }

            let offsetWidth = this.$refs.content.clientWidth -
                this.$refs.content.offsetWidth;

            if ( this.overflowX ) {
                this.adaptScrollWidth();
            }

            if ( window ) {
                this.passedWidth = width;
            }

            if ( offsetWidth === 0 && this.touch ) {
                width -= 15;
            }

            let style = {
                width: (width + 1) + 'px'
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

            let $inner = Dom.find(this.$refs.content)
                .child();

            let height = $inner.actual(() => {
                return $inner.scrollHeight();
            });

            if ( height !== this.passedHeight ) {
                $inner.css({ height: height + 'px' });
            }

            let width = $inner.actual(() => {
                return $inner.scrollWidth();
            });

            if ( width !== this.passedWidth ) {
                $inner.css({ width: width + 'px' });
            }

            delete this.resizeTimer;
        },

        getTouchEvent(event)
        {
            if ( ! this.touch ) {
                return event;
            }

            return event.touches[0] || event.changedTouches[0];
        },

        onVbarMousedown(event)
        {
            if ( ! Arr.has([0, 1], event.which) ) {
                return;
            }

            event.stopPropagation();

            Dom.find(document).on(this.mousemove, 
                this.onVbarMousemove, this._.uid);

            Dom.find(document).on(this.mouseup, 
                this.onVbarMouseup, this._.uid);

            this.scrollTop = this.$refs.content
                .scrollTop;

            this.clientY = this.getTouchEvent(event)
                .clientY;
        },

        onVbarMousemove(event)
        {
            let clientY = this.getTouchEvent(event)
                .clientY;

            let top = (this.outerHeight / this.innerHeight) * 
                this.scrollTop * this.heightRatio;

            let offset = (clientY - this.clientY) + top;

            let height = (this.outerHeight - 
                    this.barHeight - this.offsetY);

            this.$refs.content.scrollTop = offset / height * 
                (this.innerHeight - this.outerHeight);
        },

        onVbarMouseup(event)
        {
            Dom.find(document).off(this.mousemove, 
                null, this._.uid);

            Dom.find(document).off(this.mouseup, 
                null, this._.uid);
        },

        onHbarMousedown(event)
        {
            if ( ! Arr.has([0, 1], event.which) ) {
                return;
            }
            
            event.stopPropagation();

            Dom.find(document).on(this.mousemove, 
                this.onHbarMousemove, this._.uid);

            Dom.find(document).on(this.mouseup, 
                this.onHbarMouseup, this._.uid);

            this.scrollLeft = this.$refs.content
                .scrollLeft;

            this.clientX = event.clientX;
        },

        onHbarMousemove(event)
        {
            let top = (this.outerWidth / this.innerWidth) * 
                this.scrollLeft * this.widthRatio;

            let offset = (event.clientX - this.clientX) + top;

            let width = (this.outerWidth - 
                    this.barWidth - this.offsetX);

            this.$refs.content.scrollLeft = offset / width * 
                (this.innerWidth - this.outerWidth);
        },

        onHbarMouseup(event)
        {
            Dom.find(document).off(this.mousemove, 
                null, this._.uid);

            Dom.find(document).off(this.mouseup, 
                null, this._.uid);
        }

    },

    render()
    {
        let classList = [
            'n-scrollbar'
        ];

        if ( this.touch ) {
            classList.push('n-scrollbar--touch');
        }

        if ( this.overflowY ) {
            classList.push('n-overflow-y');
        }

        if ( this.overflowX ) {
            classList.push('n-overflow-x');
        }

        let vbarProps = {
            ['on' + Str.ucfirst(this.mousedown)]: this.onVbarMousedown
        };

        let hbarProps = {
            ['on' + Str.ucfirst(this.mousedown)]: this.onHbarMousedown
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
