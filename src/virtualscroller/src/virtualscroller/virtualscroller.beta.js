import { UUID, Arr, Obj, Num, Dom, Any, Locale, Event } from "nano-js";

export default {

    name: 'NVirtualscroller',

    model: {
        prop: 'items'
    },

    props: {

        items: {
            default()
            {
                return [];
            }
        },

        itemHeight: {
            default()
            {
                return 30;
            }
        },

        viewportHeight: {
            default()
            {
                return false;
            }
        },

        renderNode: {
            default()
            {
                return null;
            }
        },

        threshold: {
            default()
            {
                return 100;
            },
            type: [Number]
        },

        bufferItems: {
            default()
            {
                return 10;
            },
            type: [Number]
        },

        frameRate: {
            default()
            {
                return 30;
            },
            type: [Number]
        }

    },

    methods: {

        scrollTop(value = -1)
        {
            if ( value !== -1 ) {
                this.$refs.viewport.$el.scrollTop = value;
            }

            return this.$refs.viewport.$el.scrollTop;
        },

        refreshDriver()
        {
            if ( ! this.$refs.viewport || ! this.height ) {
                return;
            }

            let scrollTop = this.$refs.viewport.$el.scrollTop;

            let startIndex = Math.floor(
                (scrollTop / this.itemHeight) - (this.bufferItems / 2)
            );

            if ( startIndex < 0 ) {
                startIndex = 0;
            }

            let endIndex = Math.ceil(
                ((scrollTop + this.height) / this.itemHeight) + (this.bufferItems / 2)
            );

            if ( endIndex > this.items.length ) {
                endIndex = this.items.length;
            }

            let itemCount = Math.ceil(this.height / this.itemHeight)
                + this.bufferItems;

            if ( endIndex - startIndex < itemCount ) {
                endIndex = startIndex + itemCount;
            }

            let newState = {
                startIndex, endIndex
            };

            if ( ! Any.isEqual(newState, this.state.startIndex) ) {
                this.state = newState;
            }
        },

        discoverHeight()
        {
            if ( this.viewportHeight ) {
                this.height = Dom.find(this.$el).height();
            }

            if ( ! this.viewportHeight ) {
                this.height = this.items.length * this.itemHeight;
            }

            if ( ! this.height ) {
                return Any.delay(this.discoverHeight, 50);
            }

            Any.async(this.refreshDriver);
        },

        eventScroll()
        {
            Any.async(this.refreshDriver);
        },

        eventScrollstop()
        {
            Any.async(this.refreshDriver);
        }

    },

    data()
    {
        let state = {
            startIndex: 0,
            endIndex: 0,
        };

        return {
            state, veInit: false
        };
    },

    mounted()
    {
        this.$watch('items', this.discoverHeight);

        let ident = {
            _uid: this._uid
        };

        Dom.find(this.$el).on('scroll',
            Any.framerate(this.eventScroll, this.frameRate), ident);

        Dom.find(this.$el).on('scrollstop',
            Any.debounce(this.eventScrollstop, 50), ident);

        Dom.find(this.$el).observerResize(this.discoverHeight)(this.$el);

        this.veInit = true;
    },

    beforeDestroy()
    {
        let ident = {
            _uid: this._uid
        };

        Dom.find(this.$el).off('scroll', null, ident);
        Dom.find(this.$el).off('scrollstop', null, ident);
    },

    renderItems()
    {
        return Arr.each(this.items, (value, position) => {
            return this.renderNode({ value, position });
        });
    },

    renderBuffer()
    {
        let items = Arr.slice(this.items, this.state.startIndex,
            this.state.endIndex);

        return Arr.each(Any.vals(items), (value, position) => {
            return this.renderNode({ value, position });
        });
    },

    renderBody()
    {
        if ( ! this.veInit ) {
            return null;
        }

        if ( ! this.items.length ) {
            return this.$slots.empty || null;
        }

        if ( ! this.viewportHeight || this.items.length <= this.threshold ) {
            return (
                <NScrollbar ref="viewport">
                    { this.ctor('renderItems')() }
                </NScrollbar>
            );
        }

        let endIndex =  Math.min(this.items.length, this.state.endIndex);

        return (
            <NScrollbar ref="viewport">
                <div style={{ height: (this.state.startIndex * this.itemHeight) + 'px' }}></div>
                { this.ctor('renderBuffer')() }
                <div style={{ height: ((this.items.length - endIndex) * this.itemHeight) + 'px' }}></div>
            </NScrollbar>
        );
    },

    render($render)
    {
        this.$render = $render;

        return (
            <div class="n-virtualscroller">
                { this.$slots.before || null }
                { this.ctor('renderBody')() }
                { this.$slots.default || null }
            </div>
        );
    }

}
