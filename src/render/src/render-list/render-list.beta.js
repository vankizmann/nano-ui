import { UUID, Arr, Obj, Num, Dom, Any, Locale, Event } from "nano-js";
import { virtualScrollDriver } from "dynamic-virtual-scroll"

export default {

    name: 'NRenderList',

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
        }

    },

    methods: {

        refreshDriver()
        {
            if ( ! this.$refs.viewport ) {
                return Any.delay(this.refreshDriver);
            }

            let scrollTop = 0;

            if ( this.$refs.viewport.$el ) {
                scrollTop = this.$refs.viewport.$el.scrollTop;
            }

            let options = {
                totalItems: this.items.length,
                minRowHeight: this.itemHeight,
                viewportHeight: this.height,
                scrollTop: scrollTop,
            };

            this.state = virtualScrollDriver(options, this.state, () => this.itemHeight);
        },

        discoverHeight()
        {
            if ( this.viewportHeight === true ) {
                this.height = Dom.find(this.$el).parent().height();
            }

            if ( this.viewportHeight === false ) {
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

    beforeMount()
    {
        if ( ! Any.isBool(this.viewportHeight) ) {
            this.height = this.viewportHeight;
        }
    },

    mounted()
    {
        this.$watch('items', this.discoverHeight);

        Dom.find(this.$el).observerResize(this.discoverHeight)(this.$el);
    },

    renderItems(start, count)
    {
        let result = Arr.slice(this.items, start, start + count);

        result = Arr.each(result, (value, key) => {
            return this.renderNode(this.$render, value, key);
        });

        return result;
    },

    render($render)
    {
        this.$render = $render;

        if ( this.viewportHeight === false ) {
            return (
                <div class="n-render-list">
                    {
                        Arr.each(this.items, (value, key) => {
                            return this.renderNode(this.$render, value, key);
                        })
                    }
                </div>
            );
        }

        if ( Any.isEmpty(this.state) ) {
            return (
                <div class="n-render-list"></div>
            );
        }

        let style = {
            overflow: 'auto', overflowAnchor: 'none', outline: 'none', height: this.height + 'px'
        };

        let targetHeight = Obj.get(this.state, 'targetHeight');

        return (
            <div class="n-render-list">
                { ! Any.isEmpty(this.state) &&
                    <NRenderScrollbar ref="viewport" style={style} onScroll={() => this.refreshDriver()}>
                        <div style={{ height: targetHeight ? targetHeight + 'px' : 'auto' }}>
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
                    </NRenderScrollbar>
                }
            </div>
        );
    }

}
