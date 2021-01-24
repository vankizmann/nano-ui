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

        renderNode: {
            default()
            {
                return null;
            }
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
                return 10;
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

    },

    data()
    {
        let state = {
            startIndex: 0, endIndex: 0,
        };

        return {
            uid: UUID(), state, height: 0
        };
    },

    watch: {

        'items': function () {
            this.prevRender = {}; this.updateRender();
        }

    },

    beforeMount()
    {
        this.isBigStep = false;
        this.scrollTop = 0;
        this.prevRender = {};
    },

    methods: {

        isIndexRendered(index)
        {
            if ( this.items.length <= this.threshold ) {
                return true;
            }

            return this.state.startIndex < index && 
                this.state.endIndex > index;
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

            if ( index === -1 || index >= this.items.length ) {
                index = this.items.length;
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
            this.state = { startIndex: 0, endIndex: 0 };
        },

        updateRender()
        {
            if ( this.items.length <= this.threshold ) {
                return this.clearState();
            }

            this.scrollTop = Obj.get(this.$refs.scrollbar, 
                '$refs.content.scrollTop');

            this.refreshDriver();
        },

        onScrollupdate(scrollTop)
        {
            clearTimeout(this.timeout);

            let updateCallback = () => {
                this.onScrollupdate(scrollTop);
            };

            let isBigStep = Math.abs(scrollTop -
                this.scrollTop) > 300 || this.isBigStep;

            let limit = 160;

            if ( isBigStep ) {
                limit = Math.abs(scrollTop - this.scrollTop) / 150;
            }

            this.scrollTop = scrollTop;

            let inTimeRange = Date.now() - this.timer <
                Math.max(limit, 300)

            if ( this.timer && inTimeRange ) {
                return this.timeout = setTimeout(updateCallback, 60);
            }

            this.timer = Date.now();

            if ( ! Any.isNumber(scrollTop) ) {
                return;
            }

            this.timeout = -1;

            if ( this.items.length <= this.threshold ) {
                return this.clearState();
            }

            clearTimeout(this.fulltimer);

            let stepCallbacks = () => {
                this.refreshDriver();
                this.isBigStep = false;
            }

            this.isBigStep = isBigStep;

            if ( isBigStep ) {
                this.fulltimer = setTimeout(stepCallbacks, 500);
            }

            this.refreshDriver(isBigStep);
        },

        onSizechange(height)
        {
            if ( ! Any.isNumber(height) ) {
                return;
            }

            if ( this.items.length <= this.threshold ) {
                return this.clearState();
            }

            this.height = height;

            this.refreshDriver();
        },

        refreshDriver(ignoreBuffer = false)
        {
            let itemBuffer = Math.round(this.height /
                this.itemHeight);

            let bufferItems = itemBuffer;

            if ( ! ignoreBuffer ) {
                bufferItems += itemBuffer * 4;
            }

            let startItem = Math.round(this.scrollTop /
                this.itemHeight);

            let endItem = Math.round((this.scrollTop + 
                this.height) / this.itemHeight);

            let startIndex = startItem - bufferItems;

            if ( startIndex < 0 ) {
                startIndex = 0;
            }

            let endIndex = endItem + bufferItems;

            if ( endIndex > this.items.length ) {
                endIndex = this.items.length;
            }

            let newState = {
                startIndex, endIndex
            };

            let isInRange = this.state.startIndex <= startIndex &&
                this.state.endIndex >= endIndex;

            if ( isInRange || Any.isEqual(newState, this.state) ) {
                return;
            }

            this.state = newState;
        },

    },

    renderItem(passed)
    {
        let uid = passed.value.id;

        if ( this.prevRender[uid] ) {
            return this.prevRender[uid];
        }

        passed.index = (passed.index +
            this.state.startIndex);

        let topOffset = Math.round(this.itemHeight * 
            passed.index);

        let renderFunction = this.$slots.default;

        if ( this.renderNode ) {
            renderFunction = this.renderNode;
        }

        let props = {
            key: uid, 'data-index': passed.index
        };

        props.style = {
            top: topOffset + 'px', height: this.itemHeight + 'px'
        };
        
        return (
            <div class="n-virtualscroller__item" {...props}>
                { renderFunction(passed) }
            </div>
        );

        return this.prevRender[uid];
    },

    renderItems()
    {
        if ( ! this.items.length ) {
            return this.$slots.empty && this.$slots.empty() || null;
        }

        let items = Arr.slice(this.items, this.state.startIndex,
            this.state.endIndex);

        if ( this.items.length <= this.threshold ) {
            items = this.items;
        }

        return Arr.each(items, (value, index) => {
            return this.ctor('renderItem')({ value, index });
        });
    },

    render()
    {
        let props = {
            overflowY: this.overflowY,
            overflowX: this.overflowX,
            offsetY: this.offsetY,
            offsetX: this.offsetX,
            onSizechange: this.onSizechange,
            onScrollupdate: this.onScrollupdate,
        };

        let style = {};

        if ( this.items.length ) {
            style.height = (this.items.length * this.itemHeight) + 'px';
        }

        return (
            <NScrollbar ref="scrollbar" {...props}>
                <div class="n-virtualscroller__inner" style={style}>
                    { this.ctor('renderItems')() }
                </div>
            </NScrollbar>
        );
    }

}
