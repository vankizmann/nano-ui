import { UUID, Arr, Obj, Dom, Any, Str, Locale, Event, Num } from "@kizmann/pico-js";

export default {

    name: 'NResizer',

    props: {

        modelValue: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        width: {
            default()
            {
                return '';
            },
            type: [Number, String]
        },

        flex: {
            default()
            {
                return '';
            },
            type: [String]
        },

        minWidth: {
            default()
            {
                return 60;
            },
            type: [Number]
        },

        maxWidth: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        group: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        },

        position: {
            default()
            {
                return 'right';
            },
            type: [String]
        },

        resizerWidth: {
            default()
            {
                return 6;
            },
            type: [Number]
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
            sizeFixed: false, tempValue: this.modelValue,
        };
    },

    watch: {

        modelValue(value)
        {
            if ( value !== this.tempValue ) {
                this.tempValue = value;
            }
        },

    },

    mounted()
    {
        this.observer = new ResizeObserver(() => {
            this.getWidthDebounced();
        });

        this.observer.observe(this.$el);

        if ( !this.modelValue ) {
            this.getWidthDebounced();
        }

        Event.bind('NScrollbar:paused', (...args) => {
            this.updateRemoteWidth(...args)
        }, this._.uid);

        Event.bind('NResizer:move', (...args) => {
            this.forceWidth(...args)
        }, this._.uid);

        this.updateHandle();
    },

    unmounted()
    {
        this.observer.disconnect();

        Event.unbind('NScrollbar:paused',
            this._.uid);

        Event.unbind('NResizer:move',
            this._.uid);
    },

    methods: {

        getWidthDebounced()
        {
            if ( Dom.find(this.$el).inside('.n-paused') ) {
                return;
            }

            let now = this.$el.getBoundingClientRect();

            if ( Any.isEqual(this.last || {}, now) ) {
                return;
            }

            this.last = now;

            clearInterval(this.interval);

            this.interval = setTimeout(() => {
                this.updateWidth();
            }, 5);
        },

        forceWidth(group)
        {
            if ( !Arr.has(group, this.group) ) {
                return;
            }

            if ( !this.tempValue || !this.group.length ) {
                return;
            }

            this.sizeFixed = true;

            let style = {
                width: this.tempValue + 'px', flex: '0 0 auto'
            };

            Dom.find(this.$el).css(style);
        },

        updateRemoteWidth(el)
        {
            if ( Dom.find(el).contains(this.$el) ) {
                this.updateWidth();
            }
        },

        updateWidth()
        {
            let width = Dom.find(this.$el).width();

            if ( width === this.tempValue ) {
                return;
            }

            this.$emit('updateWidth', this.tempValue = width);

            this.updateHandle();
        },

        updateHandle()
        {
            let style = {};

            if ( this.position === 'left' ) {
                style.transform = `translateX(-${this.tempValue - this.resizerWidth}px)`
            }

            if ( this.position === 'right' ) {
                style.transform = `translateX(${this.tempValue - this.resizerWidth}px)`
            }

            Dom.find(this.$refs.handle).css(style);
        },

        getTouchEvent(event)
        {
            if ( !this.touch ) {
                return event;
            }

            return event.touches[0] || event.changedTouches[0];
        },

        onLeftMousedown(event)
        {
            if ( !Arr.has([0, 1], event.which) ) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            if ( this.group.length ) {
                Event.fire('NResizer:move', this.group);
            }

            Dom.find(this.$el).addClass('n-move');
            Dom.find(document.body).addClass('n-move');

            Dom.find(document).on(this.mouseup,
                Any.framerate(this.onLeftMouseup, 60), this._.uid);

            Dom.find(document).on(this.mousemove,
                Any.framerate(this.onLeftMousemove, 60), this._.uid);
        },

        onLeftMousemove(event)
        {
            this.clientX = (window.innerWidth -
                this.getTouchEvent(event).clientX);

            let offsetX = Dom.find(this.$el)
                .offset('right');

            let scrollX = Dom.find(this.$el)
                .scroll('right');

            let targetWidth = (this.clientX + scrollX - offsetX) +
                (this.resizerWidth * 0.5);

            if ( this.minWidth ) {
                targetWidth = Math.max(targetWidth,
                    this.minWidth - this.resizerWidth);
            }

            if ( this.maxWidth ) {
                targetWidth = Math.min(targetWidth,
                    this.maxWidth - this.resizerWidth);
            }

            console.log('aaaaa')

            let style = {
                transform: `translateX(-${targetWidth - this.resizerWidth}px)`
            };

            Dom.find(this.$refs.handle).css(style);
        },

        onLeftMouseup(event)
        {
            event.preventDefault();
            event.stopPropagation();

            Dom.find(document).off(this.mouseup, null, this._.uid);
            Dom.find(document).off(this.mousemove, null, this._.uid);

            if ( !this.clientX ) {
                return;
            }

            let offsetX = Dom.find(this.$el)
                .offset('right');

            let scrollX = Dom.find(this.$el)
                .scroll('right');

            let targetWidth = this.clientX + scrollX - offsetX +
                (this.resizerWidth * 0.5);

            if ( this.minWidth ) {
                targetWidth = Math.max(targetWidth, this.minWidth);
            }

            if ( this.maxWidth ) {
                targetWidth = Math.min(targetWidth, this.maxWidth);
            }

            this.tempValue = Math.round(targetWidth);

            Dom.find(this.$el).removeClass('n-move');

            let style = {
                transform: `translateX(-${targetWidth - this.resizerWidth}px)`
            };

            Dom.find(this.$refs.handle).css(style);

            let frameStyle = {
                width: this.tempValue + 'px', flex: '0 0 auto'
            };

            Dom.find(this.$el).css(frameStyle);

            delete this.clientX;

            if ( this.group.length ) {
                Event.fire('NResizer:moved', this.group);
            }

            this.sizeFixed = true;

            this.$emit('update:modelValue', this.tempValue);
        },

        onRightMousedown(event)
        {
            if ( !Arr.has([0, 1], event.which) ) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            if ( this.group.length ) {
                Event.fire('NResizer:move', this.group);
            }

            Dom.find(this.$el).addClass('n-move');
            Dom.find(document.body).addClass('n-move');

            Dom.find(document).on(this.mouseup,
                Any.framerate(this.onRightMouseup, 60), this._.uid);

            Dom.find(document).on(this.mousemove,
                Any.framerate(this.onRightMousemove, 60), this._.uid);
        },

        onRightMousemove(event)
        {
            this.clientX = this.getTouchEvent(event).clientX;

            let offsetX = Dom.find(this.$el)
                .offset('left');

            let scrollX = Dom.find(this.$el)
                .scroll('left');

            let targetWidth = (this.clientX + scrollX - offsetX) +
                (this.resizerWidth * 0.5);

            if ( this.minWidth ) {
                targetWidth = Math.max(targetWidth,
                    this.minWidth - this.resizerWidth);
            }

            if ( this.maxWidth ) {
                targetWidth = Math.min(targetWidth,
                    this.maxWidth - this.resizerWidth);
            }

            let style = {
                transform: `translateX(${targetWidth - this.resizerWidth}px)`
            };

            Dom.find(this.$refs.handle).css(style);
        },

        onRightMouseup(event)
        {
            event.preventDefault();
            event.stopPropagation();

            Dom.find(document).off(this.mousemove, null, this._.uid);
            Dom.find(document).off(this.mouseup, null, this._.uid);

            if ( !this.clientX ) {
                return;
            }

            let offsetX = Dom.find(this.$el)
                .offset('left');

            let scrollX = Dom.find(this.$el)
                .scroll('left');

            let targetWidth = (this.clientX + scrollX - offsetX) +
                (this.resizerWidth * 0.5);

            if ( this.minWidth ) {
                targetWidth = Math.max(targetWidth, this.minWidth);
            }

            if ( this.maxWidth ) {
                targetWidth = Math.min(targetWidth, this.maxWidth);
            }

            this.tempValue = Math.round(targetWidth);

            Dom.find(this.$el).removeClass('n-move');

            let style = {
                transform: `translateX(${targetWidth - this.resizerWidth}px)`
            };

            Dom.find(this.$refs.handle).css(style);

            let frameStyle = {
                width: this.tempValue + 'px', flex: '0 0 auto'
            };

            Dom.find(this.$el).css(frameStyle);

            delete this.clientX;

            if ( this.group.length ) {
                Event.fire('NResizer:moved', this.group);
            }

            this.sizeFixed = true;

            this.$emit('update:modelValue', this.tempValue);
        }

    },

    renderHandle()
    {
        if ( this.disabled ) {
            return null;
        }

        let classList = [
            'n-resizer__handle',
        ];

        let props = {};

        if ( this.position === 'right' ) {
            props['on' + Str.ucfirst(this.mousedown)] = this.onRightMousedown;
        }

        if ( this.position === 'left' ) {
            props['on' + Str.ucfirst(this.mousedown)] = this.onLeftMousedown;
        }

        if ( this.resizerWidth ) {
            props.width = this.resizerWidth + 'px';
        }

        return (
            <div ref="handle" class={classList} {...props} />
        );
    },

    render()
    {
        let classList = [
            'n-resizer',
            'n-resizer--' + this.type,
            'n-resizer--' + this.position,
        ];

        let style = {};

        if ( !Any.isEmpty(this.flex) ) {
            style['flex'] = this.flex;
        }

        let width = this.width;

        if ( Any.isNumber(width) ) {
            width = width + 'px';
        }

        if ( !Any.isEmpty(this.width) ) {
            style['width'] = this.width;
        }

        if ( this.sizeFixed && this.tempValue ) {
            style['flex'] = `0 0 ${this.tempValue}px`;
        }

        if ( this.sizeFixed && this.tempValue ) {
            style['width'] = `${this.tempValue}px`;
        }

        if ( this.minWidth ) {
            style['min-width'] = `${this.minWidth}px`;
        }

        if ( this.maxWidth ) {
            style['max-width'] = `${this.maxWidth}px`;
        }

        return (
            <div class={classList} style={style}>
                {[this.$slots.default && this.$slots.default(), this.ctor('renderHandle')()]}
            </div>
        );
    }

}
