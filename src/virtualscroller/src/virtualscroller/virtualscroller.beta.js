import { UUID, Arr, Obj, Num, Dom, Any, Locale, Event } from "nano-js";
import { virtualScrollDriver } from "dynamic-virtual-scroll"

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

        preloadItems: {
            default()
            {
                return 20;
            },
            type: [Number]
        },

        bufferItems: {
            default()
            {
                return 60;
            },
            type: [Number]
        },

        frameRate: {
            default()
            {
                return 5;
            },
            type: [Number]
        }

    },

    methods: {

        refreshDriver()
        {
            if ( ! this.$refs.viewport || ! this.height ) {
                return;
            }

            let scrollTop = this.$refs.viewport.$el.scrollTop;

            let startIndex = Math.floor(scrollTop / this.itemHeight) -
                (this.preloadItems / 2);

            if ( startIndex < 0 ) {
                startIndex = 0;
            }

            let startBuffer = startIndex - (this.bufferItems / 2);

            if ( startBuffer < 0 ) {
                startBuffer = 0;
            }

            let endIndex = Math.floor((scrollTop + this.height) / this.itemHeight) +
                (this.preloadItems / 2);

            if ( endIndex > this.items.length ) {
                endIndex = this.items.length;
            }

            let endBuffer = endIndex + (this.bufferItems / 2);

            if ( endBuffer > this.items.length ) {
                endBuffer = this.items.length;
            }

            let startBufferDiff = Math.abs(this.state.startBuffer - startBuffer);

            if ( startBufferDiff < Math.round(this.bufferItems / 3) ) {
                startBufferDiff = this.state.startBuffer;
            }

            let endBufferDiff = Math.abs(this.state.endBuffer - endBuffer);

            if ( endBufferDiff < Math.round(this.bufferItems / 3) ) {
                endBufferDiff = this.state.endBuffer;
            }

            let startIndexDiff = Math.abs(this.state.startIndex - startIndex);

            if ( startIndexDiff < Math.round(this.preloadItems / 3) && startIndex !== 0 ) {
                startIndex = this.state.startIndex;
            }

            let endIndexDiff = Math.abs(this.state.endIndex - endIndex);

            if ( endIndexDiff < Math.round(this.bufferItems / 3) && endIndex !== this.bufferItems.length ) {
                endIndex = this.state.endIndex;
            }

            let itemsCount = Math.floor(this.height / this.itemHeight) +
                this.preloadItems;

            let newState = { startIndex, startBuffer, endIndex, endBuffer, itemsCount };

            let isSameState = newState.startIndex === this.state.startIndex &&
                newState.endIndex === this.state.endIndex;

            if ( isSameState ) {
                return;
            }

            console.log('update');

            this.state = newState;
        },

        discoverHeight()
        {
            if ( this.viewportHeight ) {
                this.height = Dom.find(this.$el).height();
            }

            if ( ! this.viewportHeight ) {
                this.height = this.items.length * this.itemHeight;
            }

            if ( this.height === 0 ) {
                return Any.delay(this.discoverHeight, 100);
            }

            Any.async(this.refreshDriver);
        },

        eventScroll()
        {
            this.refreshDriver();
        },

        eventScrollstop()
        {
            this.refreshDriver();
        }

    },

    data()
    {
        let state = {
            startIndex: -1000,
            startBuffer: -1000,
            endIndex: 0,
            endBuffer: 0,
            itemsCount: 0
        };

        return {
            state, height: 0, veUpdate: 0
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
        let items = Arr.slice(Any.vals(this.items),
            this.state.startBuffer, this.state.endBuffer);

        // Get buffer end
        let bufferStart = this.state.startIndex - this.state.startBuffer;

        // Get buffer start
        let bufferEnd = bufferStart + this.state.itemsCount;

        return Arr.each(items, (value, index) => {

            if ( index < bufferStart || index > bufferEnd ) {
                return (<div key={`${this._uid}-${index}`} class="n-virtualscroller__item" style={{ height: this.itemHeight + 'px' }}></div>);
            }

            return this.renderNode({ value, index });
        });
    },

    renderBody()
    {
        if ( ! this.items.length ) {
            return this.$slots.empty || null;
        }

        if ( this.viewportHeight === false) {
            return Arr.each(this.items, (value, index) => {
                return this.renderNode({ value, index });
            });
        }

        let style = {
            overflow: 'auto', overflowAnchor: 'none', outline: 'none', height: this.height + 'px'
        };

        return (
            <NScrollbar ref="viewport" style={style}>
                <div>
                    <div style={{ height: (this.state.startBuffer * this.itemHeight) + 'px' }}></div>
                    { this.ctor('renderItems')() }
                    <div style={{ height: ((this.items.length - this.state.endBuffer) * this.itemHeight) + 'px' }}></div>
                </div>
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
