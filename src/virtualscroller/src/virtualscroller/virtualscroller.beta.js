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
                return 20;
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

        refreshDriver()
        {
            if ( ! this.$refs.viewport || ! this.height ) {
                return;
            }

            let scrollTop = this.$refs.viewport.$el.scrollTop;

            let startIndex = Math.floor(scrollTop / this.itemHeight);

            if ( startIndex < 0 ) {
                startIndex = 0;
            }

            let startPreload = Math.floor(startIndex - (this.preloadItems / 2));

            if ( startPreload < 0 ) {
                startPreload = 0;
            }

            let startBuffer = Math.floor(startPreload - (this.bufferItems / 2));

            if ( startBuffer < 0 ) {
                startBuffer = 0;
            }

            let endIndex = Math.ceil((scrollTop + this.height) / this.itemHeight);

            if ( endIndex > this.items.length ) {
                endIndex = this.items.length;
            }

            let endPreload = Math.ceil(endIndex + (this.preloadItems / 2));

            if ( endPreload > this.items.length ) {
                endPreload = this.items.length;
            }

            let endBuffer = Math.ceil(endPreload + (this.bufferItems / 2));

            if ( endBuffer > this.items.length ) {
                endBuffer = this.items.length;
            }

            let startBufferDiff = Math.abs(this.state.startBuffer - startBuffer);

            if ( startBufferDiff < Math.round(this.bufferItems / 2) ) {
                startBufferDiff = this.state.startBuffer;
            }

            let endBufferDiff = Math.abs(this.state.endBuffer - endBuffer);

            if ( endBufferDiff < Math.round(this.bufferItems / 2) ) {
                endBufferDiff = this.state.endBuffer;
            }

            let newState = {
                startIndex, startPreload, startBuffer, endIndex, endPreload, endBuffer
            };

            let isSameState = newState.startIndex === this.state.startIndex &&
                newState.endIndex === this.state.endIndex;

            if ( isSameState ) {
                return;
            }

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
            startPreload: 0,
            startBuffer: 0,
            endIndex: 0,
            endPreload: 0,
            endBuffer: 0
        };

        return {
            state, height: 0, veInit: false, veUpdate: 0
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
        let items = Arr.slice(Any.vals(this.items),
            this.state.startBuffer, this.state.endBuffer);

        // Get buffer end
        let bufferStart = this.state.startPreload - this.state.startBuffer;

        // Get buffer start
        let bufferEnd = this.state.endPreload - this.state.startBuffer;

        return Arr.each(items, (value, index) => {

            let ghost = index < bufferStart || index > bufferEnd;

            return this.renderNode({ value, index, ghost });
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
