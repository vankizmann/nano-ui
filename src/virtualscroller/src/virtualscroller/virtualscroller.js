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
                return 8;
            },
            type: [Number]
        }

    },

    methods: {

        bindScroller()
        {
            if ( ! this.$refs.viewport ) {
                return Any.delay(this.bindScroller, 100);
            }

            Dom.find(this.$refs.viewport.$el).on('scroll',
                Any.framerate(this.refreshDriver, 15));

            Dom.find(this.$refs.viewport.$el).on('scroll',
                Any.debounce(this.refreshDriver, 60));
        },

        refreshDriver()
        {
            if ( ! this.$refs.viewport ) {
                return;
            }

            let scrollTop = 0;

            if ( this.$refs.viewport ) {
                scrollTop = this.$refs.viewport.$el.scrollTop;
            }

            if ( scrollTop < 0 ) {
                return;
            }

            let options = {
                bufferItems: this.bufferItems,
                totalItems: this.items.length,
                viewportHeight: this.height,
                minRowHeight: this.itemHeight,
                scrollTop: scrollTop,
            };

            let newState = virtualScrollDriver(options, this.state, () => this.itemHeight);

            let isSameState = Arr.reduce(newState, (same, val, key) => {
                return same && this.state[key] === val;
            }, true);

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

            this.refreshDriver();
        }

    },

    data()
    {
        let state = {
            items: this.items
        };

        return {
            height: 0, state
        };
    },

    mounted()
    {
        this.$watch('items', this.discoverHeight);

        this.bindScroller();

        Dom.find(this.$el).observerResize(this.discoverHeight)(this.$el);
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

                if ( Any.isString(this.renderNode) ) {
                    return this.$render(this.renderNode, { value, index })
                }

                return this.renderNode({ value, index });
            });

        }

        if ( Any.isEmpty(this.state) ) {
            return null;
        }

        let style = {
            overflow: 'auto', overflowAnchor: 'none', outline: 'none', height: this.height + 'px'
        };

        let targetHeight = Obj.get(this.state, 'targetHeight');

        return (
            <NScrollbar ref="viewport" on={this.$listeners} style={style}>
                <div style={{ height: targetHeight ? targetHeight + 'px' : 'auto', overflow: 'hidden', paddingRight: '15px' }}>
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
