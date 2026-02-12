import { Hash, Num, Arr, Obj, Dom, Mix, Event, Locale } from "@kizmann/pico-js";
import NDraghandler from "../draghandler/draghandler.js";

window.DEBUG_NDLIST = false;

export default {

    name: 'NDraggrid',

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

        renderNode: {
            default()
            {
                return null;
            }
        },

        draggable: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        },

        current: {
            default()
            {
                return null;
            }
        },

        selected: {
            default()
            {
                return [];
            }
        },

        handle: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        group: {
            default()
            {
                return ['default'];
            },
            type: [Array]
        },

        allowGroups: {
            default()
            {
                return ['default'];
            },
            type: [Array]
        },

        safezone: {
            default()
            {
                return (height) => -1;
            }
        },

        lazyload: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        showEmptyIcon: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        itemHeight: {
            default()
            {
                return 200;
            },
            type: [Number]
        },

        itemWidth: {
            default()
            {
                return 150;
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

        useKeys: {
            default()
            {
                return false;
            },
            type: [Boolean]
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
                return 0;
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

        scrollTopOnChange: {
            default()
            {
                return false;
            }
        },

        uniqueProp: {
            default()
            {
                return 'id';
            },
            type: [String]
        },

        childProp: {
            default()
            {
                return 'children';
            },
            type: [String]
        },

        renderCurrent: {
            default()
            {
                return true;
            }
        },

        renderHandle: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        renderSelect: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        transformDrop: {
            default()
            {
                return (node) => node;
            }
        },

        disableMove: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        insertNode: {
            default()
            {
                return true;
            }
        },

        removeNode: {
            default()
            {
                return true;
            }
        },

        allowSelect: {
            default()
            {
                return () => true;
            }
        },

        allowDrag: {
            default()
            {
                return () => true;
            }
        },

        allowDrop: {
            default()
            {
                return () => true;
            }
        },

        keyEvents: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        highlightTimeout: {
            default()
            {
                return 7000;
            },
            type: [Number]
        }

    },

    provide()
    {
        return {
            NDraggable: this
        };
    },

    data()
    {
        return {
            uid: Hash.uuid(),
            virtuals: [],
            visible: [],
            childNodes: {},
            highlight: [],
            firstSelected: null,
            tempCurrent: this.current,
            tempExpanded: this.expanded,
            tempSelected: this.selected
        };
    },

    beforeMount()
    {
        this.drag = new NDraghandler(this);
    },

    mounted()
    {
        let frame = this.$refs.virtualscroller.
            $refs.inner;

        this.drag.bindRoot(frame);

        this.$watch('tempSelected', this.watchSelected,
            { deep: true });

        this.refreshVirtuals();
    },

    beforeUnmount()
    {
        this.drag.unbindRoot();

        Dom.find(document).off('keydown', null, this.uid);
    },

    watch: {

        items()
        {
            if ( this.scrollTopOnChange ) {
                this.scrollTo();
            }

            this.refreshVirtuals();
        },

        virtuals()
        {
            this.filterVirtuals();
        },

        selected(value)
        {
            this.tempSelected = value;
        },

        current(value)
        {
            this.tempCurrent = value;
        }

    },

    methods: {

        watchSelected()
        {
            if ( ! this.tempSelected.length ) {
                return this.firstSelected = null;
            }

            this.firstSelected = Arr.find(this.virtuals, {
                [this.uniqueProp]: this.tempSelected[0]
            });
        },

        refreshVirtuals()
        {
            this.virtuals = this.drag.reduce(this.items);

            if ( window.DEBUG_NDLIST ) {
                console.log('Total virtual items mounted: ' + this.virtuals.length);
            }
        },

        filterVirtuals()
        {
            this.visible = Arr.filter(this.virtuals, (node) => {
                return node.depth === 0;
            });
        },

        getIndex(unique)
        {
            return Arr.findIndex(this.visible, {
                [this.uniqueProp]: unique
            });
        },

        getCurrentIndex()
        {
            if ( ! this.tempCurrent ) {
                return -1;
            }

            return Arr.findIndex(this.visible, {
                [this.uniqueProp]: this.tempCurrent[this.uniqueProp]
            });
        },

        scrollTo(x = 0, y = 0)
        {
            this.$refs.virtualscroller.scrollTo(x, y);
        },

        scrollToIndex(index)
        {
            this.$refs.virtualscroller.scrollIntoView(index);
        },

        isDraggable(node)
        {
            let canDrag = this.allowDrag;

            if ( ! Mix.isFunction(canDrag) ) {
                canDrag = () => this.allowDrag;
            }

            return canDrag(node);
        },

        isHighlight(node)
        {
            return Arr.has(this.highlight, node.value[this.uniqueProp]);
        },

        highlightNode(value, key = null)
        {
            clearTimeout(this.refresh);

            // Clear highlight items
            this.highlight = [];

            Arr.recursive(this.items, this.childProp, (node, cascade) => {

                if ( Obj.get(node, key || this.uniqueProp) !== value ) {
                    return;
                }

                Arr.each(cascade, (item) => {
                    Arr.add(this.tempExpanded, item[this.uniqueProp]);
                });

                Arr.add(this.highlight, node[this.uniqueProp]);
            });

            if ( ! this.highlight.length ) {
                return;
            }

            this.$nextTick(this.scrollToHighlight);

            this.refresh = setTimeout(() =>
                this.highlight = [], this.highlightTimeout);

            this.filterVirtuals();
        },

        scrollToHighlight()
        {
            if ( ! this.highlight.length ) {
                return;
            }

            let index = Arr.findIndex(this.visible, {
                [this.uniqueProp]: Arr.first(this.highlight)
            });

            this.$refs.virtualscroller.scrollIntoView(index);
        },

        isCurrent(node)
        {
            return this.renderCurrent && this.tempCurrent &&
                node.value[this.uniqueProp] === this.tempCurrent[this.uniqueProp] ;
        },

        setCurrent(node)
        {
            let isSameNode = this.tempCurrent &&
                this.tempCurrent[this.uniqueProp] === node.value[this.uniqueProp];

            if ( isSameNode ) {
                return;
            }

            this.$emit('update:current',
                this.tempCurrent = node.item);

            Event.fire('NDraggrid:syncCurrent', node.item, this.uid);
        },

        setRawCurrent(index)
        {
            let route = Obj.get(this.visible,
                [index, 'route']);

            if ( ! route ) {
                return this.setRawCurrent(0);
            }

            let item = Obj.get(this, route);

            this.$refs.virtualscroller
                .scrollIntoView(index);

            this.$emit('update:current',
                this.tempCurrent = item);

            Event.fire('NDraggrid:syncCurrent', item, this.uid);
        },

        setNextCurrent()
        {
            if ( ! this.visible.length ) {
                return;
            }

            let reset = 0;

            if ( ! this.tempCurrent ) {
                return this.setRawCurrent(reset);
            }

            let index = Arr.findIndex(this.visible, {
                [this.uniqueProp]: this.tempCurrent[this.uniqueProp]
            });

            if ( index !== -1 ) {
                index++;
            }

            if ( index >= this.visible.length ) {
                index = reset;
            }

            this.setRawCurrent(index);
        },

        setPrevCurrent()
        {
            if ( ! this.visible.length ) {
                return;
            }

            let reset = this.visible.length - 1;

            if ( ! this.tempCurrent ) {
                return this.setRawCurrent(reset);
            }

            let index = Arr.findIndex(this.visible, {
                [this.uniqueProp]: this.tempCurrent[this.uniqueProp]
            });

            if ( index !== -1 ) {
                index--;
            }

            if ( index < 0 ) {
                index = reset;
            }

            this.setRawCurrent(index);
        },

        syncCurrent()
        {
            return ['NDraggrid:syncCurrent', this.uid];
        },

        isDisabled(node)
        {
            let canSelect = this.allowSelect;

            if ( ! Mix.isFunction(canSelect) ) {
                canSelect = () => this.allowSelect;
            }

            return ! canSelect(node) || (this.firstSelected &&
                node.value.depth !== this.firstSelected.depth);
        },

        isSelected(node)
        {
            return Arr.has(this.tempSelected, node.value[this.uniqueProp]);
        },

        isTotalSelected()
        {
            let visible = Arr.filter(this.visible, (item) => {
                return ! item.depth;
            });

            return visible.length === this.tempSelected;
        },

        isInterSelected()
        {
            let visible = Arr.filter(this.visible, (item) => {
                return ! item.depth;
            });

            return visible.length !== this.tempSelected &&
                this.tempSelected;
        },

        selectItem(node)
        {
            if ( this.isDisabled(node) ) {
                return;
            }

            Arr.toggle(this.tempSelected, node.value[this.uniqueProp]);

            this.$emit('update:selected', this.tempSelected);
        },

        selectAll()
        {
            let visible = Arr.filter(this.visible, (item) => {
                return ! item.depth;
            });

            let indexies = Arr.each(visible, (item) => {
                return item[this.uniqueProp];
            });

            if ( indexies.length === this.tempSelected.length ) {
                return this.$emit('update:selected', this.tempSelected = []);
            }

            this.$emit('update:selected', this.tempSelected = indexies);
        },

        unselectAll()
        {
            if ( this.tempSelected.length ) {
                this.$emit('update:selected', this.tempSelected = []);
            }
        },

        bindKeydown()
        {
            if ( ! this.keyEvents ) {
                return;
            }

            Dom.find(document).on('keydown',
                this.onKeydown, this.uid)
        },

        unbindKeydown()
        {
            if ( ! this.keyEvents ) {
                return;
            }

            Dom.find(document).off('keydown',
                null, this.uid)
        },

        onKeydown(event, el)
        {
            if ( Dom.find(el).closest('input') ) {
                return;
            }

            if ( event.which === 38 ) {
                event.preventDefault();
                event.stopPropagation();
                // this.setPrevCurrent();
            }

            if ( event.which === 40 ) {
                event.preventDefault();
                event.stopPropagation();
                // this.setNextCurrent();
            }
        }

    },

    renderEmpty()
    {
        return (
            <NEmptyIcon disabled={! this.showEmptyIcon} class="n-draggrid__empty">
                { this.$slots.empty && this.$slots.empty() || this.trans('No entries') }
            </NEmptyIcon>
        );
    },

    renderItem(props)
    {
        return (
            <NDraggridItem {...Obj.except(props, ['index'])}>
                { { default: this.$slots.default } }
            </NDraggridItem>
        );
    },

    render()
    {
        let classList = [
            'n-draggrid',
            'n-draggrid--' + this.size,
            'n-draggrid--' + this.type
        ];

        if ( ! this.items.length ) {
            classList.push('n-empty');
        }

        let passed = [
            'threshold', 'deathzone', 'itemHeight', 'itemWidth', 'overflowX', 'overflowY',
            'offsetX', 'offsetY', 'useKeys', 'uniqueProp'
        ];

        let props = Obj.only(this.$props, passed, {
            items: this.visible,
            onMouseenter: this.bindKeydown,
            onMouseleave: this.unbindKeydown
        });

        return (
            <NVirtualscroller ref="virtualscroller" class={classList} {...props}>
                { { default: this.ctor('renderItem'), empty: this.ctor('renderEmpty') } }
            </NVirtualscroller>
        );
    }

}
