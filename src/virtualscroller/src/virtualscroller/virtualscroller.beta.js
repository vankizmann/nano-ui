import { Arr, Obj, Any } from "@kizmann/pico-js";

global.DEBUG_NVSCROLL = false;

export default {

    name: 'NVirtualscroller',

    inject: {

        NDraggable: {
            default: undefined
        }

    },

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
                return 34;
            }
        },

        itemWidth: {
            default()
            {
                return 0;
            }
        },

        renderNode: {
            default()
            {
                return null;
            }
        },

        deathzone: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        overflowY: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        overflowX: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        offsetY: {
            default()
            {
                return 10;
            },
            type: [Number]
        },

        offsetX: {
            default()
            {
                return 10;
            },
            type: [Number]
        },

        threshold: {
            default()
            {
                return 1;
            },
            type: [Number]
        },

        framerate: {
            default()
            {
                return 30;
            },
            type: [Number]
        },

    },

    data()
    {
        let state = {
            start: 0, end: 0, grid: 1
        };

        return {
            state, buffer: [], width: 0, height: 0, load: true
        };
    },

    watch: {

        'items': function () {
            this.updateRender();
        }

    },

    beforeMount()
    {
        this.scrollTop = 0;
    },

    mounted()
    {

        this.bindAdaptScroll()
    },


    beforeUnmount()
    {
        this.unbindAdaptScroll()
    },

    methods: {

        bindAdaptScroll()
        {
            this.refreshScroll = setInterval(this.onScrollupdate,
                500 / this.framerate);
        },

        unbindAdaptScroll()
        {
            clearInterval(this.refreshScroll);
        },

        isIndexRendered(index)
        {
            if ( ! this.itemHeight ) {
                return true;
            }

            return this.state.start < index &&
                this.state.end > index;
        },

        scrollIntoView(index)
        {
            if ( ! this.$refs.scrollbar ) {
                return;
            }

            if ( index === -1 || index >= this.items.length ) {
                index = this.items.length;
            }

            if ( ! this.isIndexRendered(index) ) {
                return this.scrollToIndex(index);
            }

            let selector = `[data-index="${index}"]`;

            this.$refs.scrollbar.scrollIntoView(selector);
        },

        scrollToIndex(index)
        {
            if ( ! this.$refs.scrollbar ) {
                return;
            }

            let total = Math.ceil(this.items.length /
                this.state.grid);

            index = Math.floor(index / this.state.grid);

            if ( index === -1 || index >= total ) {
                index = total;
            }

            let targetTop = index * this.itemHeight;

            if ( this.scrollTop > targetTop ) {
                return this.scrollTo(0, targetTop);
            }

            targetTop = targetTop - this.height + 
                this.itemHeight;

            this.scrollTo(0, targetTop);
        },

        scrollTo(x = 0, y = 0)
        {
            if ( ! this.$refs.scrollbar ) {
                return;
            }

            this.$refs.scrollbar.scrollTo(x, y);
        },

        clearState()
        {
            this.state = { start: 0, end: 0 };
        },

        updateRender()
        {
            this.scrollTop = this.$refs.scrollbar.
                $refs.content.scrollTop;

            Any.async(this.refreshDriver);
        },

        onScrollupdate()
        {
            if ( ! this.threshold ) {
                return;
            }

            let scrollTop = this.$refs.scrollbar.
                $refs.content.scrollTop;

            if ( scrollTop === this.scrollTop ) {
                return;
            }

            this.scrollTop = scrollTop;

            let isOutOfRange = scrollTop < 0 || scrollTop + this.height
                > this.$refs.inner.scrollHeight;

            if ( isOutOfRange ) {
                return;
            }

            Any.async(this.refreshDriver);
        },

        onSizechange(height, width)
        {
            this.width = width;
            this.height = height;

            Any.async(this.refreshDriver);
        },


        refreshDriver()
        {
            let grid = 1;

            if ( this.itemWidth ) {
                grid = Math.floor((this.width - this.deathzone) /
                    this.itemWidth) || 1;
            }

            if ( ! this.threshold || this.threshold > this.items.length ) {
                return this.state = { start: 0, end: 0, grid };
            }

            let total = Math.ceil(this.items.length
                / grid);

            let bufferItems = Math.round((this.height /
                this.itemHeight) * 0.6);

            let startItem = Math.round(this.scrollTop /
                this.itemHeight);

            let endItem = Math.round((this.scrollTop + 
                this.height) / this.itemHeight);

            let start = (startItem - bufferItems);

            if ( start < 0 ) {
                start = 0;
            }

            let end = endItem + bufferItems;

            if ( end > total ) {
                end = total;
            }

            let state = { start, end, grid };

            if ( Any.isEqual(this.state, state) ) {
                return;
            }

            this.state = state;
        },

    },

    renderItem(passed)
    {
        passed.index = (passed.index +
            this.state.start);

        let topOffset = Math.round(this.itemHeight * 
            passed.index);

        let renderFunction = this.$slots.default;

        if ( this.renderNode ) {
            renderFunction = this.renderNode;
        }

        let props = {
            'data-index': passed.index
        };

        if ( this.NDraggable ) {
            props.key = passed.value[this.NDraggable.uniqueProp];
        }

        let style = {};

        let isLazy = this.threshold && this.threshold <=
            this.items.length;

        if ( isLazy && this.state.grid === 1 ) {
            style.top = topOffset + 'px';
        }

        if ( this.itemHeight ) {
            style.height = this.itemHeight + 'px';
        }

        if ( this.state.grid !== 1 ) {
            style.width = this.itemWidth + 'px';
        }
        
        return (
            <div class="n-virtualscroller__item" style={style} {...props}>
                { renderFunction(passed) }
            </div>
        );
    },

    renderRows()
    {
        let items = Arr.slice(this.items, this.state.start,
            this.state.end);

        if ( ! this.threshold || this.threshold > this.items.length ) {
            items = this.items;
        }

        return Arr.each(items, (value, index) => {
            return this.ctor('renderItem')({ value, index });
        });
    },

    renderGridRows(passed)
    {
        let topOffset = Math.round(this.itemHeight *
            (passed.index + this.state.start));

        let style = {};

        if ( this.threshold && this.threshold <= this.items.length ) {
            style.top = topOffset + 'px';
        }

        let counter = passed.index * this.state.start;

        return (
            <div class="n-virtualscroller__row" style={style}>
                {
                    Arr.each(passed.chunk, (value, index) => {
                        return this.ctor('renderItem')({
                            value, index: index + counter
                        });
                    })
                }
            </div>
        );
    },

    renderGrid()
    {
        let chunks = Arr.chunk(this.items,
            this.state.grid);

        let items = Arr.slice(chunks, this.state.start,
            this.state.end);

        if ( ! this.threshold || this.threshold > chunks.length ) {
            items = chunks;
        }

        return Arr.each(items, (chunk, index) => {
            return this.ctor('renderGridRows')({ chunk, index });
        });
    },

    renderItems()
    {
        if ( ! this.items.length ) {
            return this.$slots.empty && this.$slots.empty() || null;
        }

        if ( this.state.grid === 1 ) {
            return this.ctor('renderRows')();
        }

        return this.ctor('renderGrid')();
    },

    render()
    {
        let classList = [
            'n-virtualscroller'
        ];

        if ( this.threshold && this.threshold <= this.items.length ) {
            classList.push('n-virtualscroller--absolute');
        }

        let props = {
            overflowY: this.overflowY,
            overflowX: this.overflowX,
            offsetY: this.offsetY,
            offsetX: this.offsetX,
            onSizechange: this.onSizechange,
        };

        let style = {};

        let totalHeight = this.items.length / this.state.grid *
            this.itemHeight;

        if ( this.threshold && this.items.length ) {
            style.height = Math.ceil(totalHeight) + 'px';
        }

        return (
            <NScrollbar class={classList} ref="scrollbar" {...props}>
                <div ref="inner" class="n-virtualscroller__inner" style={style}>
                    { this.ctor('renderItems')() }
                </div>
            </NScrollbar>
        );
    }

}
