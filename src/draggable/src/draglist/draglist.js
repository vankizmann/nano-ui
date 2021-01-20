import { UUID, Num, Arr, Obj, Dom, Any, Event, Locale } from "nano-js";
import { h } from "vue";
import NDraghandler from "../draghandler/draghandler";

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
        this.drag.bindRoot();

        this.$watch('tempSelected', this.watchSelected, 
            { deep: true });

        Any.async(this.refreshVirtuals);
    },

    beforeUnmount()
    {
        this.drag.unbindRoot();
    },

    unmounted()
    {
        this.drag.destroy();
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

            let first = Arr.find(this.virtuals, {
                [this.uniqueProp]: this.tempSelected[0]
            });

            this.firstSelected = first;
        },

        refreshVirtuals()
        {
            this.virtuals = this.drag.reduce(this.items);
            console.log('Total virtual items mounted: ' + this.virtuals.length);
        },

        filterVirtuals()
        {
            this.visible = Arr.filter(this.virtuals, (node) => {
                return ! node.depth || Arr.has(this.tempExpanded, node.parent);
            });
        },

        scrollTo(x = 0, y = 0)
        {
            this.$refs.virtualscroller.scrollTo(x, y);
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
            return this.firstSelected && 
                node.value.depth !== this.firstSelected.depth;
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

        onKeydown(event)
        {
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
            <NDraglistItem data-unique={props.value[this.uniqueProp]} {...Obj.except(props, ['index'])}>
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
            'threshold', 'itemHeight', 
            'overflowX', 'overflowY', 
            'offsetX', 'offsetY'
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
