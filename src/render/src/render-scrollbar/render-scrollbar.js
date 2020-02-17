import { UUID, Arr, Obj, Dom, Any, Locale, Event, Num } from "nano-js";

export default {

    name: 'NRenderScrollbar',

    props: {

        options: {
            default()
            {
                return {};
            },
            type: [Object]
        }

    },

    methods: {

        observeResize()
        {
            this.showScrollbarY();
            this.showScrollbarX();
            this.discoverScollbarSize();
        },

        mousedownScrollbar(event, target)
        {
            if ( Dom.find(target).closest(this.scrollbarX.get(0)) ) {
                this.trackX = true;
                this.mousemoveScrollbar(event, target, true);
            }

            if ( Dom.find(target).closest(this.scrollbarY.get(0)) ) {
                this.trackY = true;
                this.mousemoveScrollbar(event, target, true);
            }
        },

        mouseupScrollbar(event)
        {
            this.trackX = this.trackY = false;
        },

        mousemoveScrollbar(event, target)
        {
            if ( Dom.find(target).closest(this.scrollbarX.get(0)) ) {
                this.showScrollbarX();
            }

            if ( Dom.find(target).closest(this.scrollbarY.get(0)) ) {
                this.showScrollbarY();
            }

            if ( this.trackX ) {

                let parentWidth = Dom.find(this.$el).width() - this.widthX - 8;
                let targetWidth = Dom.find(this.$el).child().width() - Dom.find(this.$el).width();

                let scrollX = event.clientX - Dom.find(this.$el).offset('left') -
                    Dom.find(this.$el).parent().scroll('left');


                let offsetX = (1 / parentWidth * (scrollX - (this.widthX / 2)) * targetWidth);

                Any.async(() => Dom.find(this.$el).scrollLeft(offsetX));
            }

            if ( this.trackY ) {

                let parentHeight = Dom.find(this.$el).height() - this.heightY - 8;
                let targetHeight = Dom.find(this.$el).child().height() - Dom.find(this.$el).height();

                let scrollY = event.clientY - Dom.find(this.$el).offset('top') +
                    Dom.find(this.$el).parent().scroll('top');

                let offsetY = (1 / parentHeight * (scrollY - (this.heightY / 2)) * targetHeight);

                Any.async(() => Dom.find(this.$el).scrollTop(offsetY));
            }
        },

        showScrollbarX()
        {
            clearTimeout(this.timeoutX);

            Any.delay(() => {

                if ( Dom.find(this.$el).width() >= Dom.find(this.$el).child().width() ) {
                    return this.scrollbarX.css({ display: 'none' })
                }

                this.scrollbarX.css({ display: 'block' })
            }, 10);

            this.timeoutX = setTimeout(() => {
                this.scrollbarX.removeClass('visible');
            }, 1000);

            this.scrollbarX.addClass('visible');
        },

        showScrollbarY()
        {
            clearTimeout(this.timeoutY);

            Any.delay(() => {

                if ( Dom.find(this.$el).height() >= Dom.find(this.$el).child().height() ) {
                    return this.scrollbarY.css({ display: 'none' })
                }

                this.scrollbarY.css({ display: 'block' })
            }, 10);

            this.timeoutY = setTimeout(() => {
                this.scrollbarY.removeClass('visible');
            }, 1000);

            this.scrollbarY.addClass('visible');
        },

        adjustScrollbarX(width, height)
        {
            let targetWidth = Dom.find(this.$el).child().width();

            if ( targetWidth < width ) {
                targetWidth = width;
            }

            let ratio = (width / 100 * 100 / targetWidth);

            if ( ! Any.isNumber(ratio) ) {
                ratio = 1;
            }

            let style = {
                width: this.widthX = (ratio * width) - 8
            };

            if ( style.width < 30 ) {
                this.widthX = style.width = 30;
            }

            style.left = (100 / (targetWidth - width) * this.$el.scrollLeft) /
                100 * (width - style.width - 8);

            Obj.map(style, (val) => {
                return Any.isNumber(val) ? Num.fixed(val, 1) + 'px' : 0;
            });

            Any.async(() => this.scrollbarX.child().css(style));
        },

        adjustScrollbarY(width, height)
        {
            let targetHeight = Dom.find(this.$el).child().height();

            if ( targetHeight < height ) {
                targetHeight = height;
            }

            let ratio = (height / 100 * 100 / targetHeight);

            if ( ! Any.isNumber(ratio) ) {
                ratio = 1;
            }

            let style = {
                height: this.heightY = (ratio * height) - 8
            };

            if ( style.height < 30 ) {
                this.heightY = style.height = 30;
            }

            style.top = (100 / (targetHeight - height) * this.$el.scrollTop) /
                100 * (height - style.height - 8);

            Obj.map(style, (val) => {
                return Any.isNumber(val) ? Num.fixed(val, 1) + 'px' : 0;
            });

            Any.async(() => this.scrollbarY.child().css(style));
        },

        discoverScollbarSize()
        {
            let height = Dom.find(this.$el).parent().height();
            let width = Dom.find(this.$el).parent().width();

            Dom.find(this.$el).css({
                height: height + 'px', width: width + 'px', overflow: 'auto'
            });

            Any.async(() => this.adjustScrollbarX(width, height));
            Any.async(() => this.adjustScrollbarY(width, height));

            if ( this.scrollY !== this.$el.scrollTop ) {
                this.showScrollbarY();
            }

            this.scrollY = this.$el.scrollTop;

            if ( this.scrollX !== this.$el.scrollLeft ) {
                this.showScrollbarX();
            }

            this.scrollX = this.$el.scrollLeft;
        },

    },

    data()
    {
        return { scrollX: 0, trackX: false, scollbarX: null, scollY: 0, trackY: false, scollbarY: null }
    },

    mounted()
    {
        let $parent = Dom.find(this.$el).parent();

        $parent.addClass('n-render-scrollbar');

        this.scrollbarX = Dom.make('div').append(Dom.make('div').el)
            .appendTo($parent.get(0));

        this.scrollbarX.addClass('n-render-scrollbar__x');

        this.scrollbarY = Dom.make('div').append(Dom.make('div').el)
            .appendTo($parent.get(0));

        this.scrollbarY.addClass('n-render-scrollbar__y');


        Dom.find(document.body).on('mousedown', this.mousedownScrollbar, { _uid: this._uid });
        Dom.find(document.body).on('mouseup', this.mouseupScrollbar, { _uid: this._uid });
        Dom.find(document.body).on('mousemove', this.mousemoveScrollbar, { _uid: this._uid });

        this.$on('scroll', this.discoverScollbarSize);

        Dom.find(window).observerResize(this.observeResize)(this.$el.parentNode);
        Dom.find(window).observerResize(this.observeResize)(this.$el.childNodes);
    },

    beforeDestroy()
    {
        Dom.find(document.body).off('mousedown', null, { _uid: this._uid });
        Dom.find(document.body).off('mouseup', null, { _uid: this._uid });
        Dom.find(document.body).off('mousemove', null, { _uid: this._uid });
    },

    render()
    {
        let events = {
            scroll: this.discoverScollbarSize
        };

        return (<div on={events} class="n-render-scrollbar__wrapper">{ this.$slots.default }</div>);
    }

}
