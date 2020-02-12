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
            let parentHeight = Dom.find(this.$el).height();
            let targetHeight = Dom.find(this.$el).child().height();

            if ( targetHeight < parentHeight ) {
                targetHeight = parentHeight;
            }

            let ratio = (parentHeight / 100 * 100 / targetHeight);

            if ( ! Any.isNumber(ratio) ) {
                ratio = 1;
            }

            let style = {
                height: (ratio * parentHeight) - 8
            };

            if ( style.height < 30 ) {
                style.height = 30;
            }

            style.top = (100 / (targetHeight - parentHeight) * this.$el.scrollTop) /
                100 * (parentHeight - style.height - 9);

            Obj.map(style, (val) => {
                return Any.isNumber(val) ? Num.fixed(val, 1) + 'px' : 0;
            });

            this.scrollbarY.child().css(style);

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
        return { scrollX: 0, scollbarX: null, scollY: 0, scollbarY: null }
    },

    mounted()
    {
        let parent = Dom.find(this.$el).parent();

        parent.addClass('n-render-scrollbar');

        this.scrollbarX = Dom.make('div').append(Dom.make('div').el)
            .appendTo(parent.get(0));

        this.scrollbarX.addClass('n-render-scrollbar__x');

        this.scrollbarX.on('mousemove', this.showScrollbarX);

        this.scrollbarY = Dom.make('div').append(Dom.make('div').el)
            .appendTo(parent.get(0));

        this.scrollbarY.addClass('n-render-scrollbar__y');

        this.scrollbarY.on('mousemove', this.showScrollbarY);

        Dom.find(this.$el).on('scroll', (event) => {

            this.discoverScollbarHeight();

            this.$emit('scroll', event)
        });

        let options = {
            childList: true, subtree: true,
        };

        Dom.find(this.$el).observer(Any.debounce(this.discoverScollbarHeight))(this.$el, options);
    },

    render()
    {
        return (<div>{ this.$slots.default }</div>);
    }

}
