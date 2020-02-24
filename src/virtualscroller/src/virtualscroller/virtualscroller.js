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

        bufferItems: {
            default()
            {
                return 14;
            },
            type: [Number]
        }

    },

    methods: {

        refreshDriver(forceUpdate = false)
        {
            if ( ! this.$refs.viewport ) {
                return;
            }

            let scrollTop = 0, scrollFix = this.scrollFix || scrollTop;

            if ( this.$refs.viewport ) {
                scrollTop = this.$refs.viewport.$el.scrollTop;
            }

            let scrollBuffer = (this.bufferItems / 1.65 * this.itemHeight);

            if ( scrollTop > scrollFix + scrollBuffer || scrollTop < scrollFix - scrollBuffer ) {
                scrollFix = scrollTop;
            }

            let options = {
                bufferItems: this.bufferItems,
                totalItems: this.items.length,
                viewportHeight: this.height,
                minRowHeight: this.itemHeight,
                scrollTop: scrollTop,
            };


            if ( this.scrollFix === scrollFix && ! forceUpdate ) {
                return;
            }

            this.scrollFix = scrollFix;

            this.state = virtualScrollDriver(options, this.state, () => {
                return this.itemHeight;
            });

            this.veUpdate++;
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

            this.refreshDriver(true);
        },

        eventScroll()
        {
            this.refreshDriver(false);
        },

        eventScrollstop()
        {
            this.refreshDriver(true);
        }

    },

    data()
    {
        return {
            height: 0, scrollFix: -1, veUpdate: 0
        };
    },

    beforeMount()
    {
        this.state = {
            items: Arr.make(this.items.length)
        };
    },

    mounted()
    {
        this.$watch('items', this.discoverHeight);

        let ident = {
            _uid: this._uid
        };

        Dom.find(this.$el).on('scrollstop', this.eventScrollstop, ident);

        Dom.find(this.$el).observerResize(this.discoverHeight)(this.$el);
    },

    beforeDestroy()
    {
        let ident = {
            _uid: this._uid
        };

        Dom.find(this.$el).off('scrollstop', null, ident);
    },

    renderItems(start, count)
    {
        return Arr.each(this.items.slice(start, start + count), (value, index) => {
            return this.renderNode({ value, index });
        });
    },

    renderBody()
    {
        if ( ! this.items.length ) {
            return this.$slots.empty || null;
        }

        if ( this.viewportHeight === false ) {
            return Arr.each(this.items, (value, index) => {
                return this.renderNode({ value, index });
            });
        }

        let targetHeight = Obj.get(this.state, 'targetHeight');

        let style = {
            overflow: 'auto', overflowAnchor: 'none', outline: 'none', height: this.height + 'px'
        };

        let events = {
            scroll: Any.framerate(this.eventScroll, 45)
        };

        return (
            <NScrollbar ref="viewport" on={events} style={style}>
                <div key={this.veUpdate} style={{ height: targetHeight ? targetHeight + 'px' : 'auto', overflow: 'hidden' }}>
                    { ! Any.isEmpty(this.state.topPlaceholderHeight) &&
                        <div draggable={false} style={{ height: this.state.topPlaceholderHeight + 'px' }}></div>
                    }
                    { ! Any.isEmpty(this.state.middleItemCount) &&
                        this.ctor('renderItems')(this.state.firstMiddleItem, this.state.middleItemCount)
                    }
                    { ! Any.isEmpty(this.state.middlePlaceholderHeight) &&
                        <div draggable={false} style={{ height: this.state.middlePlaceholderHeight + 'px' }}></div>
                    }
                    { ! Any.isEmpty(this.state.lastItemCount) &&
                        this.ctor('renderItems')(this.items.length - this.state.lastItemCount, this.state.lastItemCount)
                    }
                </div>
            </NScrollbar>
        );
    },

    render($render)
    {
        this.$render = $render;

        return (
            <div class="n-render-list">
                { this.$slots.before || null }
                { this.ctor('renderBody')() }
                { this.$slots.default || null }
            </div>
        );
    }

}
