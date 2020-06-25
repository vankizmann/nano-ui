import { UUID, Arr, Obj, Dom, Any, Locale, Event, Num } from "nano-js";

export default {

    name: 'NResizer',

    model: {
        prop: 'width'
    },

    props: {

        width: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        minWidth: {
            default()
            {
                return 0;
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

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        resizerPosition: {
            default()
            {
                return 'end';
            },
            type: [String]
        },

        resizerWidth: {
            default()
            {
                return 5;
            },
            type: [Number]
        },

        bootRefresh: {
            default()
            {
                return true;
            },
            type: [Boolean]
        }

    },

    data()
    {
        return {
            veWidth: this.width
        };
    },

    methods: {

        refresh()
        {
            if ( ! this.$el ) {
                return Any.delay(this.refresh, 50);
            }

            let veWidth = Dom.find(this.$el).width();

            console.log(this.$el, veWidth);

            if ( this.veWidth ) {
                return;
            }

            this.$emit('input', this.veWidth = veWidth);
        },

        eventResizerStartMousedown(event)
        {
            event.preventDefault();
            event.stopPropagation();

            Dom.find(this.$el).addClass('n-resize');
            Dom.find(document.body).addClass('n-resize');

            Dom.find(document).on('mouseup',
                Any.throttle(this.eventResizerStartMouseup, 30), this._uid);

            Dom.find(document).on('mousemove',
                Any.framerate(this.eventResizerStartMousemove, 30), this._uid);
        },

        eventResizerStartMousemove(event)
        {
            this.clientX = (window.innerWidth - event.clientX);

            event.preventDefault();

            let offsetX = Dom.find(this.$el)
                .offset('right');

            let scrollX = Dom.find(this.$el)
                .scroll('right');

            let targetWidth = (this.clientX + scrollX - offsetX) -
                (this.resizerWidth / 2);

            if ( this.minWidth ) {
                targetWidth = Math.max(targetWidth,
                    this.minWidth - this.resizerWidth);
            }

            if ( this.maxWidth ) {
                targetWidth = Math.min(targetWidth,
                    this.maxWidth - this.resizerWidth);
            }

            let style = {
                transform: `translateX(-${targetWidth}px)`
            };

            Dom.find(this.$el).find('[data-resizer]').css(style);
        },

        eventResizerStartMouseup(event)
        {
            event.preventDefault();
            event.stopPropagation();

            Dom.find(document).off('mousemove', null, this._uid);
            Dom.find(document).off('mouseup', null, this._uid);

            if ( ! this.clientX ) {
                return;
            }

            let offsetX = Dom.find(this.$el)
                .offset('right');

            let scrollX = Dom.find(this.$el)
                .scroll('right');

            let targetWidth = this.clientX + scrollX - offsetX;

            if ( this.minWidth ) {
                targetWidth = Math.max(targetWidth, this.minWidth);
            }

            if ( this.maxWidth ) {
                targetWidth = Math.min(targetWidth, this.maxWidth);
            }

            this.veWidth = Math.round(targetWidth);

            Dom.find(this.$el).removeClass('n-resize');
            Dom.find(document.body).removeClass('n-resize');

            let style = {
                transform: `translateX(-${targetWidth - this.resizerWidth}px)`
            };

            Dom.find(this.$el).find('[data-resizer]').css(style);

            delete this.clientX;

            this.$nextTick(() => this.$emit('input', this.veWidth));
        },

        eventResizerEndMousedown(event)
        {
            event.preventDefault();

            Dom.find(this.$el).addClass('n-resize');
            Dom.find(document.body).addClass('n-resize');

            Dom.find(document).on('mouseup',
                Any.throttle(this.eventResizerEndMouseup, 30), this._uid);

            Dom.find(document).on('mousemove',
                Any.framerate(this.eventResizerEndMousemove, 30), this._uid);
        },

        eventResizerEndMousemove(event)
        {
            this.clientX = event.clientX;

            event.preventDefault();

            let offsetX = Dom.find(this.$el)
                .offset('left');

            let scrollX = Dom.find(this.$el)
                .scroll('left');

            let targetWidth = (this.clientX + scrollX - offsetX) -
                (this.resizerWidth / 2);

            if ( this.minWidth ) {
                targetWidth = Math.max(targetWidth,
                    this.minWidth - this.resizerWidth);
            }

            if ( this.maxWidth ) {
                targetWidth = Math.min(targetWidth,
                    this.maxWidth - this.resizerWidth);
            }

            let style = {
                transform: `translateX(${targetWidth}px)`
            };

            Dom.find(this.$el).find('[data-resizer]').css(style);
        },

        eventResizerEndMouseup(event)
        {
            event.preventDefault();
            event.stopPropagation();

            Dom.find(document).off('mousemove', null, this._uid);
            Dom.find(document).off('mouseup', null, this._uid);

            if ( ! this.clientX ) {
                return;
            }

            let offsetX = Dom.find(this.$el)
                .offset('left');

            let scrollX = Dom.find(this.$el)
                .scroll('left');

            let targetWidth = this.clientX + scrollX - offsetX;

            if ( this.minWidth ) {
                targetWidth = Math.max(targetWidth, this.minWidth);
            }

            if ( this.maxWidth ) {
                targetWidth = Math.min(targetWidth, this.maxWidth);
            }

            this.veWidth = Math.round(targetWidth);

            Dom.find(this.$el).removeClass('n-resize');
            Dom.find(document.body).removeClass('n-resize');

            let style = {
                transform: `translateX(${targetWidth - this.resizerWidth}px)`
            };

            Dom.find(this.$el).find('[data-resizer]').css(style);

            delete this.clientX;

            this.$nextTick(() => this.$emit('input', this.veWidth));
        }

    },

    watch: {

        width()
        {
            if ( this.width !== this.veWidth ) {
                this.veWidth = this.width;
            }
        }

    },

    mounted()
    {
        if ( this.bootRefresh ) {
            this.refresh();
        }
    },

    render()
    {
        let classList = [
            'n-resizer',
            'n-resizer--' + this.resizerPosition
        ];

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        let style = {};

        if ( this.resizerPosition === 'start' ) {
            style.transform =`translateX(-${this.veWidth - this.resizerWidth}px)`
        }

        if ( this.resizerPosition === 'end' ) {
            style.transform = `translateX(${this.veWidth - this.resizerWidth}px)`
        }

        let events = {};

        if ( this.resizerPosition === 'end' ) {
            events.mousedown = this.eventResizerEndMousedown;
        }

        if ( this.resizerPosition === 'start' ) {
            events.mousedown = this.eventResizerStartMousedown;
        }

        let resizerHtml = (
            <div class={classList} data-resizer="true" style={style} on={events} />
        );

        return (
            <div>
                { [this.$slots.default, resizerHtml] }
            </div>
        );
    }

}
