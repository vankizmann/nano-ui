import { Arr, Obj, Dom, Any, Str, Event, UUID } from "@kizmann/pico-js";

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

        allowNative: {
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
                return 24;
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

        touch()
        {
            return !!('ontouchstart' in window ||
                navigator.msMaxTouchPoints);
        },

        mousedown()
        {
            return this.touch ? 'touchstart' :
                'mousedown';
        },

        mousemove()
        {
            return this.touch ? 'touchmove' :
                'mousemove';
        },

        mouseup()
        {
            return this.touch ? 'touchend' :
                'mouseup';
        }

    },

    data()
    {
        return {
            uid: UUID(), init: false, native: false, height: 0, width: 0
        };
    },

    beforeMount()
    {
        this.adaptScrollBehavior();
    },

    mounted()
    {
        this.observer = new ResizeObserver(() => {
            this.getWrapperSizeDebounced();
        });

        this.observer.observe(this.$el);

        if ( this.$refs.wrapper ) {
            this.observer.observe(this.$refs.wrapper);
        }

        Event.bind('NScrollbar:resize',
            this.onResize, this._.uid);

        Event.bind('NResizer:moved',
            this.getWrapperSizeDebounced, this._.uid);

        let passive = {
            passive: true, uid: this._.uid
        };

        Dom.find(this.$refs.content).on('scroll',
            this.onScroll, passive);
    },


    beforeUnmount()
    {
        this.observer.disconnect();

        Event.unbind('NScrollbar:resize',
            this._.uid);

        Event.unbind('NResizer:moved',
            this._.uid);

        let passive = {
            passive: true, uid: this._.uid
        };

        Dom.find(this.$el).off('scroll',
            null, passive);
    },

    methods: {

        getWrapperSizeDebounced()
        {
            let now = this.$refs.wrapper.getBoundingClientRect();

            if ( Any.isEqual(this.last || {}, now) ) {
                return;
            }

            this.last = now;

            clearInterval(this.interval);

            this.interval = setTimeout(() => {
                this.getWrapperSize();
            }, 5);
        },

        getWrapperSize()
        {
            let [width, height] = [0, 0];

            Dom.find(this.$refs.spacer).actual(() => {
                [width, height] = [
                    Math.round(this.$refs.wrapper.getBoundingClientRect().width),
                    Math.round(this.$refs.wrapper.getBoundingClientRect().height)
                ];
            });

            if ( width === this.width && height === this.height ) {
                return;
            }

            [this.width, this.height] = [
                width, height
            ];

            if ( width === 0 || height === 0 ) {
                return;
            }

            let styles = {
                //
            };

            if ( this.width ) {
                styles.width = this.width + 'px';
            }

            if ( this.height ) {
                styles.height = this.height + 'px';
            }

            Dom.find(this.$refs.spacer).css(styles);

            this.adaptScrollHeight();
            this.adaptScrollWidth();

            let [frameWidth, frameHeight] = [
                Dom.find(this.$el).width(), Dom.find(this.$el).height()
            ];

            this.$emit('sizechange', frameWidth, frameHeight, this.$el);
        },

        scrollTo(x = 0, y = 0, delay = 0)
        {
            if ( Any.isEmpty(delay) ) {
                return this.scrollTo(x, y);
            }

            Any.delay(() => this.onScrollTo(x, y), delay);
        },

        onScrollTo(x = 0, y = 0)
        {
            this.$refs.content.scrollTop = y;
            this.$refs.content.scrollLeft = x;

            // if ( this.$refs.content.scrollTop != y || this.$refs.content.scrollLeft != x ) {
            //     setTimeout(() => this.onScrollTo(x, y), 5);
            // }
        },

        scrollIntoView(selector, delay = 0, padding = 0)
        {
            Any.delay(() => this.onScrollIntoView(selector, padding), delay);
        },

        onScrollIntoView(selector, padding = 0)
        {
            let $el = Dom.find(this.$el).find(selector);

            let scrollTop = this.$refs.content
                .scrollTop;

            let outerHeight = this.$refs.content.clientHeight;

            let offsetTop = $el.offsetTop(this.$el);

            if ( offsetTop < scrollTop ) {
                this.$refs.content.scrollTop = offsetTop - padding;
            }

            if ( offsetTop + $el.height() >= scrollTop + outerHeight ) {
                this.$refs.content.scrollTop = offsetTop - outerHeight + $el.height() + padding;
            }

            let scrollLeft = this.$refs.content
                .scrollLeft;

            let outerWidth = this.$refs.content.clientWidth;

            let offsetLeft = $el.offsetLeft(this.$el);

            if ( offsetLeft < scrollLeft ) {
                this.$refs.content.scrollLeft = offsetLeft - padding;
            }

            if ( offsetLeft + $el.width() >= scrollLeft + outerWidth ) {
                this.$refs.content.scrollLeft = offsetLeft - outerWidth + $el.width() + padding;
            }
        },

        adaptScrollBehavior()
        {
            let $dom = Dom.make('div', { classList: ['n-scrollbar-test'] })
                .appendTo(document.body).get(0);

            Dom.make('div').appendTo($dom);

            this.native = $dom.clientWidth === $dom.offsetWidth ||
                $dom.clientHeight === $dom.offsetHeight;

            $dom.remove();
        },

        adaptScrollHeight()
        {
            if ( this.native && this.allowNative ) {
                return;
            }

            let [innerHeight, outerHeight] = [
                this.height || 0, this.$el.clientHeight || 0
            ];

            let compare = [
                outerHeight === this.outerHeight,
                innerHeight === this.innerHeight
            ];

            if ( !Arr.has(compare, false) ) {
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

            Dom.find(this.$refs.vbar).css({
                height: (this.barHeight = Math.ceil(barHeight)) + 'px'
            });

            let hasVtrack = outerHeight && outerHeight < innerHeight;

            if ( hasVtrack ) {
                Dom.find(this.$el).addClass('has-vtrack');
            }

            if ( !hasVtrack ) {
                Dom.find(this.$el).removeClass('has-vtrack');
            }

            this.adaptScrollPosition();
        },

        adaptScrollWidth()
        {
            if ( this.native && this.allowNative ) {
                return;
            }

            let [innerWidth, outerWidth] = [
                this.width || 0, this.$el.clientWidth || 0
            ];

            let compare = [
                outerWidth === this.outerWidth,
                innerWidth === this.innerWidth
            ];

            if ( !Arr.has(compare, false) ) {
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

            Dom.find(this.$refs.hbar).css({
                width: (this.barWidth = Math.ceil(barWidth)) + 'px'
            });

            let hasHtrack = outerWidth && outerWidth < innerWidth;

            if ( hasHtrack ) {
                Dom.find(this.$el).addClass('has-htrack');
            }

            if ( !hasHtrack ) {
                Dom.find(this.$el).removeClass('has-htrack');
            }

            this.adaptScrollPosition();
        },

        adaptScrollPosition(scroll = {})
        {
            if ( this.native && this.allowNative ) {
                return;
            }

            if ( !scroll.top ) {
                scroll.top = this.$refs.content.scrollTop;
            }

            if ( !scroll.left ) {
                scroll.left = this.$refs.content.scrollLeft;
            }

            let vbarTop = Math.ceil((this.outerHeight / this.innerHeight) *
                scroll.top * this.heightRatio) || 0;

            if ( !this.vbarTop || vbarTop !== this.vbarTop ) {

                Dom.find(this.$refs.vbar).css({
                    transform: `translateY(${vbarTop}px) translateZ(0)`
                });

                this.vbarTop = vbarTop;
            }

            let hbarLeft = Math.ceil((this.outerWidth / this.innerWidth) *
                scroll.left * this.widthRatio) || 0;

            if ( !this.hbarLeft || hbarLeft !== this.hbarLeft ) {

                Dom.find(this.$refs.hbar).css({
                    transform: `translateX(${hbarLeft}px) translateZ(0)`
                });

                this.hbarLeft = hbarLeft;
            }
        },

        onScroll()
        {
            let scroll = {
                top: this.$refs.content.scrollTop,
                left: this.$refs.content.scrollLeft
            };

            this.$nextTick().then(() => {
                this.$emit('scrollupdate', scroll.top, scroll.left);
            });

            this.adaptScrollPosition(scroll);
        },

        getTouchEvent(event)
        {
            if ( !this.touch ) {
                return event;
            }

            return event.touches[0] || event.changedTouches[0];
        },

        onVbarMousedown(event)
        {
            if ( !Arr.has([0, 1], event.which) ) {
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

            Dom.find(this.$refs.vbar).addClass('is-active');
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

            Dom.find(this.$refs.vbar).removeClass('is-active');
        },

        onHbarMousedown(event)
        {
            if ( !Arr.has([0, 1], event.which) ) {
                return;
            }

            event.stopPropagation();

            Dom.find(document).on(this.mousemove,
                this.onHbarMousemove, this._.uid);

            Dom.find(document).on(this.mouseup,
                this.onHbarMouseup, this._.uid);

            this.scrollLeft = this.$refs.content
                .scrollLeft;

            this.clientX = this.getTouchEvent(event)
                .clientX;

            Dom.find(this.$refs.hbar).addClass('is-active');
        },

        onHbarMousemove(event)
        {
            let clientX = this.getTouchEvent(event)
                .clientX;

            let left = (this.outerWidth / this.innerWidth) *
                this.scrollLeft * this.widthRatio;

            let offset = (clientX - this.clientX) + left;

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

            Dom.find(this.$refs.hbar).removeClass('is-active');
        },

    },

    render()
    {
        let classList = [
            'n-scrollbar'
        ];

        if ( this.native ) {
            classList.push('n-scrollbar--native');
        }

        if ( !this.allowNative ) {
            classList.push('n-scrollbar--forced');
        }

        if ( this.touch ) {
            classList.push('n-scrollbar--touch');
        }

        if ( window.WIN ) {
            classList.push('n-windows');
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
                    <div ref="wrapper" class={this.wrapClass}>
                        {this.$slots.default && this.$slots.default()}
                    </div>
                </div>
                <div class="n-scrollbar-spacer" ref="spacer">
                    { /* Adapt inner height */}
                </div>
                <div ref="hbar" class="n-scrollbar-h" {...hbarProps}></div>
                <div ref="vbar" class="n-scrollbar-v" {...vbarProps}></div>
            </div>
        );
    }

}
