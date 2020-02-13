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
            if ( Dom.find(target).closest(this.scrollbarY.get(0)) ) {
                this.showScrollbarY();
            }

            if ( Dom.find(target).closest(this.scrollbarX.get(0)) ) {
                this.showScrollbarX();
            }

            if ( this.trackX ) {

                let parentWidth = Dom.find(this.$el).width() - this.heightX - 8;
                let targetWidth = Dom.find(this.$el).child().width() - Dom.find(this.$el).width();

                let scrollX = event.clientX - Dom.find(this.$el).offset('left') -
                    Dom.find(this.$el).parent().scroll('left');


                let offsetX = (1 / parentWidth * (scrollX - (this.heightX / 2)) * targetWidth);

                Any.async(() => Dom.find(this.$el).scrollTop(offsetX));
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

            this.timeoutX = setTimeout(() => {
                this.scrollbarX.removeClass('visible');
            }, 1000);

            this.scrollbarX.addClass('visible');
        },

        showScrollbarY()
        {
            clearTimeout(this.timeoutY);

            this.timeoutY = setTimeout(() => {
                this.scrollbarY.removeClass('visible');
            }, 1000);

            this.scrollbarY.addClass('visible');
        },

        discoverScollbarHeight()
        {
            let parentHeight = Dom.find(this.$el).parent().height();

            Dom.find(this.$el).css({ height: parentHeight + 'px' });

            let targetHeight = Dom.find(this.$el).child().height();

            if ( targetHeight < parentHeight ) {
                targetHeight = parentHeight;
            }

            let ratio = (parentHeight / 100 * 100 / targetHeight);

            if ( ! Any.isNumber(ratio) ) {
                ratio = 1;
            }

            let style = {
                height: this.heightY = (ratio * parentHeight) - 8
            };

            if ( style.height < 30 ) {
                this.heightY = style.height = 30;
            }

            style.top = (100 / (targetHeight - parentHeight) * this.$el.scrollTop) /
                100 * (parentHeight - style.height - 9);

            Obj.map(style, (val) => {
                return Any.isNumber(val) ? Num.fixed(val, 1) + 'px' : 0;
            });

            Any.async(() => this.scrollbarY.child().css(style));

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
        Dom.find(document.body).on('mousemove', Any.throttle(this.mousemoveScrollbar, 5), { _uid: this._uid });

        this.$on('scroll', this.discoverScollbarHeight);

        Dom.find(this.$el).on('scroll', (event) => this.$emit('scroll', event));

        // $parent.observerResize('resize', this.discoverScollbarHeight)($parent.get(0));

        let options = {
            childList: true, subtree: true,
        };

        Dom.find(this.$el).observer(this.discoverScollbarHeight)(this.$el, options);
    },

    beforeDestroy()
    {
        Dom.find(document.body).off('mousedown', null, { _uid: this._uid });
        Dom.find(document.body).off('mouseup', null, { _uid: this._uid });
        Dom.find(document.body).off('mousemove', null, { _uid: this._uid });
    },

    render()
    {
        return (<div>{ this.$slots.default }</div>);
    }

}
