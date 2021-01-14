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

        showEmpty: {
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

        scrollTopOnChange: {
            default()
            {
                return true;
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
                return (item) => item;
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

        allowCurrent: {
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

        wrapNode: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        updateDelay: {
            default()
            {
                return 100;
            },
            type: [Number]
        },

        keyEvents: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        keyDebounce: {
            default()
            {
                return 100;
            },
            type: [Number]
        },

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
            virtuals: [], 
            visible: [], 
            childNodes: {}, 
            firstSelected: null, 
            tempExpanded: [], 
            tempSelected: []
        };
    },

    beforeMount()
    {
        // Draghandler in window schreiben, vue scheint die elements zu tauschen
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
            this.refreshVirtuals();
        },

        virtuals()
        {
            this.filterVirtuals();
        },

        selected(value)
        {
            this.tempSelected = value;
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

        isDraggable(node)
        {
            let canDrag = this.allowDrag;

            if ( ! Any.isFunction(canDrag) ) {
                canDrag = () => this.allowDrag;
            }

            return canDrag(node);
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
        }

    },

    renderEmpty()
    {
        if ( ! this.showEmpty ) {
            return null;
        }

        return (
            <NEmptyIcon class="n-draglist__empty">
                 { this.$slots.empty && this.$slots.empty() || this.trans('No entries') }
            </NEmptyIcon>
        );
    },

    renderItem(props)
    {
        return (
            <NDraglistItem {...props}>
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

        let props = Obj.only(this.$props, ['threshold', 'itemHeight'], {
            items: this.visible
        });

        return (
            <NVirtualscroller ref="virtualscroller" class={classList} {...props}>
                { { default: this.ctor('renderItem'), empty: this.ctor('renderEmpty') } }
            </NVirtualscroller>
        );
    }

}
