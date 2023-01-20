import { UUID, Num, Arr, Obj, Dom, Any, Event, Locale } from "@kizmann/pico-js";
import NDraghandler from "../draghandler/draghandler";

global.DEBUG_NDLIST = false;

export default {

    name: 'NDraglist',

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

        expanded: {
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
                return (height) => height * 0.265;
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
                return 34;
            },
            type: [Number]
        },

        itemOffset: {
            default()
            {
                return 30;
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

        renderExpand: {
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
            uid: UUID(),
            modifier: [],
            virtuals: [], 
            visible: [], 
            childNodes: {}, 
            highlight: [],
            firstSelected: null,
            lastSelected: null,
            tempCurrent: this.current, 
            tempExpanded: this.expanded, 
            tempSelected: this.selected
        };
    },

    beforeMount()
    {
        this.drag = new NDraghandler(this);

        Dom.find(window).on('keydown',
            this.watchModifierDown, this._uid);

        Dom.find(window).on('keyup',
            this.watchModifierUp, this._uid);
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
        Dom.find(document).off('keyup', null, this.uid);
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

        expanded(value)
        {
            this.tempExpanded = value;

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

        watchModifierDown(e)
        {
            Arr.add(this.modifier, e.which);
        },

        watchModifierUp(e)
        {
            Arr.remove(this.modifier, e.which);
        },

        watchSelected()
        {
            if ( ! this.tempSelected.length ) {
                return this.firstSelected = null;
            }

            this.firstSelected = Arr.find(this.virtuals, {
                [this.uniqueProp]: this.tempSelected[0]
            });
        },

        findVirtual(unique)
        {
            let value = Arr.find(this.virtuals, (item) => {
                return item[this.uniqueProp] === unique;
            });

            if ( ! value ) {
                return null;
            }

            return {
                value, item: Obj.get(this, value.route, null)
            };
        },

        refreshVirtuals()
        {
            this.virtuals = this.drag.reduce(this.items);

            if ( global.DEBUG_NDLIST ) {
                console.log('Total virtual items mounted: ' + this.virtuals.length);
            }
        },

        filterVirtuals()
        {
            this.visible = Arr.filter(this.virtuals, (node) => {
                return Arr.contains(this.tempExpanded, node.cascade.slice(0, -1));
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
            if ( ! this.$refs.virtualscroller ) {
                return Any.delay(() => this.scrollTo(x, y));
            }

            this.$refs.virtualscroller.scrollTo(x, y);
        },

        scrollToIndex(index)
        {
            if ( ! this.$refs.virtualscroller ) {
                return Any.delay(() => this.scrollToIndex(index));
            }

            this.$refs.virtualscroller.scrollIntoView(index);
        },

        isDraggable(node)
        {
            let canDrag = this.allowDrag;

            if ( ! Any.isFunction(canDrag) ) {
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
            
            Event.fire('NDraglist:syncCurrent', node.item, this.uid);
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
            
            Event.fire('NDraglist:syncCurrent', item, this.uid);
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
            return ['NDraglist:syncCurrent', this.uid];
        },

        isDisabled(node)
        {
            let canSelect = this.allowSelect;

            if ( ! Any.isFunction(canSelect) ) {
                canSelect = () => this.allowSelect;
            }

            return ! canSelect(node) || (this.firstSelected &&
                node.value.depth !== this.firstSelected.depth);
        },

        hasChildren(node)
        {
            return !! this.getChildren(node).length;
        },

        getChildren(node)
        {
            return Obj.get(node.item, this.childProp, []);
        },

        isExpanded(node)
        {
            return Arr.has(this.tempExpanded, node.value[this.uniqueProp]);
        },

        expandItem(node)
        {
            if ( ! this.hasChildren(node) ) {
                return;
            }

            Arr.toggle(this.tempExpanded, node.value[this.uniqueProp]);

            this.filterVirtuals();
        },

        expandCurrent()
        {
            if ( ! this.tempCurrent ) {
                return;
            }

            let children = Obj.get(this.tempCurrent, 
                this.childProp);

            if ( Any.isEmpty(children) ) {
                return;
            }

            Arr.toggle(this.tempExpanded, 
                this.tempCurrent[this.uniqueProp]);

            this.filterVirtuals();
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

        toggleSingleNode(node)
        {
            Arr.toggle(this.tempSelected, this.lastSelected =
                node.value[this.uniqueProp]);
        },

        toggleRangeNode(node)
        {
            let indexies = [0, -1], reversed = false;

            if ( ! Any.isEmpty(this.lastSelected) ) {
                indexies[1] = this.getIndex(this.lastSelected);
            }

            indexies[0] = this.getIndex(node.value[this.uniqueProp]);

            if ( indexies[1] > indexies[0] ) {
                reversed = true;
            }

            if ( ! reversed ) {
                indexies = [indexies[1]+1, indexies[0]+1];
            }

            Arr.each(this.items.slice(indexies[0], indexies[1]), (item, index) => {
                Arr.toggle(this.tempSelected, item[this.uniqueProp]);
            });

            this.lastSelected = node.value[this.uniqueProp];
        },

        selectItem(node)
        {
            if ( this.isDisabled(node) ) {
                return;
            }

            ! Arr.has(this.modifier, 16) || this.renderExpand ?
                this.toggleSingleNode(node) : this.toggleRangeNode(node);

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

            this.lastSelected = null;

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

            if ( event.which === 32 ) {
                event.preventDefault();
                event.stopPropagation();
                this.expandCurrent();
            }

            if ( event.which === 38 ) {
                event.preventDefault();
                event.stopPropagation();
                this.setPrevCurrent();
            }

            if ( event.which === 40 ) {
                event.preventDefault();
                event.stopPropagation();
                this.setNextCurrent();
            }
        }

    },

    renderEmpty()
    {
        return (
            <NEmptyIcon disabled={! this.showEmptyIcon} class="n-draglist__empty">
                 { this.$slots.empty && this.$slots.empty() || this.trans('No entries') }
            </NEmptyIcon>
        );
    },

    renderItem(props)
    {
        return (
            <NDraglistItem {...Obj.except(props, ['index'])}>
                { { default: this.$slots.default } }
            </NDraglistItem>
        );
    },

    render()
    {
        let classList = [
            'n-draglist',
            'n-draglist--' + this.size,
            'n-draglist--' + this.type
        ];

        if ( ! this.items.length ) {
            classList.push('n-empty');
        }

        let passed = [
            'threshold', 'bufferItems', 'itemHeight', 
            'overflowX', 'overflowY',  'offsetX', 'offsetY', 'useKeys'
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
