import { UUID, Arr, Obj, Num, Dom, Any, Locale, Event } from "nano-js";

global.DEBUG_NVSCROLL = true;

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
            startIndex: 0, endIndex: 0
        };

        return {
            state, height: 0, load: true
        };
    },

    watch: {

        'items': function () {
            console.log('items changehd');
            this.prevRender = {};
            this.updateRender();
        }

    },

    beforeMount()
    {
        this.scrollTop = 0;
        this.prevRender = {};
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
                1000 / this.framerate);
        },

        unbindAdaptScroll()
        {
            clearInterval(this.refreshScroll);
        },

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

        onScrollupdate()
        {
            let scrollTop = Obj.get(this.$refs.scrollbar,
                '$refs.content.scrollTop');

            if ( scrollTop === this.scrollTop ) {
                return;
            }

            // clearTimeout(this.timeout);

            // let updateCallback = () => {
            //     this.onScrollupdate(scrollTop);
            // };

            this.scrollTop = scrollTop;

            // let isNotReady = this.timer && Date.now() -
            //     this.timer <= limit;
            //
            // if ( ! this.timer ) {
            //     this.timer = Date.now();
            // }
            //
            // if ( isNotReady ) {
            //     return this.timeout = setTimeout(
            //         updateCallback, 6);
            // }

            // this.timer = Date.now();

            console.log('scoll changed')
            Any.async(this.refreshDriver);
        },

        onSizechange(height)
        {
            if ( ! Any.isNumber(height) ) {
                return;
            }

            this.height = height;

            console.log('size changed');
            this.refreshDriver()
        },


        refreshDriver(staggerBuffer = 0)
        {
            this.lastTop = this.scrollTop;

            if ( this.state.endIndex === 0 ) {
                staggerBuffer = 2;
            }

            let itemBuffer = Math.round(this.height /
                this.itemHeight);

            itemBuffer = Math.max(itemBuffer, 6);

            let bufferItems = Math.round(itemBuffer *
                (0.5 + staggerBuffer));

            bufferItems = Math.min(bufferItems,
                itemBuffer * 2);

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

            if ( Any.isEqual(newState, this.state) ) {
                return;
            }

            clearTimeout(this.refresh);

            if ( global.DEBUG_NVSCROLL ) {
                console.log('staggerRun: ' + staggerBuffer, bufferItems);
            }

            let staggerFunction = () => {
                this.refreshDriver(staggerBuffer + 0.5);
            };

            if ( staggerBuffer < 2 ) {
                this.refresh = setTimeout(staggerFunction, 250);
            }

            let isInRange = this.state.startIndex <= startIndex &&
                this.state.endIndex >= endIndex;

            if ( isInRange ) {
                return;
            }

            if ( global.DEBUG_NVSCROLL ) {
                console.log('Initiate rerender');
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
        
        this.prevRender[uid] = (
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
            <NScrollbar class="n-virtualscroller" ref="scrollbar" {...props}>
                <div class="n-virtualscroller__inner" style={style}>
                    { this.ctor('renderItems')() }
                </div>
            </NScrollbar>
        );
    }

}
