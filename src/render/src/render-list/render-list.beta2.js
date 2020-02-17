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
            if ( ! Obj.has(this.$refs, 'viewport.$el') ) {
                return Any.delay(this.bindScroller, 300);
            }

            Dom.find(this.$refs.viewport.$el).on('scroll',
                Any.framerate(this.refreshDriver, 10));

            Dom.find(this.$refs.viewport.$el).on('scroll',
                Any.debounce(this.refreshDriver, 30));
        },

        refreshDriver()
        {
            if ( ! Obj.has(this.$refs, 'viewport.$el') ) {
                return;
            }

            let scrollTop = 0;

            if ( this.$refs.viewport.$el ) {
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
            if ( this.viewportHeight === true ) {
                this.height = Dom.find(this.$el).parent().height();
            }

            if ( this.viewportHeight === false ) {
                this.height = this.items.length * this.itemHeight;
            }

            if ( this.height === 0 ) {
                return Any.delay(this.discoverHeight, 300);
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

        this.bindScroller();

        Dom.find(this.$el).observerResize(this.discoverHeight)(this.$el);
    },

    renderItems(start, count)
    {
        let result = Arr.slice(this.items, start, start + count);

        result = Arr.each(result, (value, index) => {

            let props = { value, index };

            if ( Any.isString(this.renderNode) ) {
                return this.$render(this.renderNode, { props })
            }

            return this.renderNode(props);
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
                        Arr.each(this.items, (value, index) => {

                            if ( Any.isString(this.renderNode) ) {
                                return this.$render(this.renderNode, { props })
                            }

                            return this.renderNode({ value, index });
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
                    <NRenderScrollbar ref="viewport" on={this.$listeners} style={style}>
                        <div style={{ height: targetHeight ? targetHeight + 'px' : 'auto', overflow: 'hidden' }}>
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
