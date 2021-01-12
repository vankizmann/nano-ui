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

        keyProp: {
            default()
            {
                return 'md5';
            },
            type: [String]
        },

        orderProp: {
            default()
            {
                return 'order';
            },
            type: [String]
        },

        uniqueProp: {
            default()
            {
                return 'id';
            },
            type: [String]
        },

        depthProp: {
            default()
            {
                return 'depth';
            },
            type: [String]
        },

        pathProp: {
            default()
            {
                return 'path';
            },
            type: [String]
        },

        indexProp: {
            default()
            {
                return 'index';
            },
            type: [String]
        },

        cascadeProp: {
            default()
            {
                return 'cascade';
            },
            type: [String]
        },

        parentProp: {
            default()
            {
                return 'parent';
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
                return true;
            },
            type: [Boolean]
        },

        renderExpand: {
            default()
            {
                return true;
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
                return () => true;
            }
        },

        removeNode: {
            default()
            {
                return () => true;
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
            drag: null, virtuals: [], visible: [], tempExpanded: [], tempSelected: []
        };
    },

    beforeMount()
    {
        this.drag = new NDraghandler(this);
    },

    mounted()
    {
        Any.async(this.refreshVirtuals);
    },

    watch: {
        
        items(value)
        {
            this.refreshVirtuals();
        },

        virtuals()
        {
            this.filterVirtuals();
        }

    },

    methods: {

        refreshVirtuals()
        {
            this.virtuals = this.drag.reduce(this.items);
            console.log('Total virtual items mounted: ' + this.virtuals.length);
        },

        filterVirtuals()
        {
            this.visible = Arr.filter(this.virtuals, (item) => {
                return ! item[this.depthProp] || Arr.has(this.tempExpanded, item[this.parentProp]);
            });
        },

        isExpanded(item)
        {
            return Arr.has(this.tempExpanded, item[this.uniqueProp]);
        },

        expandItem(item)
        {
            Arr.toggle(this.tempExpanded, item[this.uniqueProp]);

            this.filterVirtuals();
        },

        isSelected(item)
        {
            return Arr.has(this.tempSelected, item[this.uniqueProp]);
        },

        selectItem(item)
        {
            Arr.toggle(this.tempSelected, item[this.uniqueProp]);
        }

    },

    renderEmpty()
    {
        if ( ! this.showEmpty ) {
            return null;
        }

        return (
            <div class="n-draglist__empty">
                 { this.$slots.empty && this.$slots.empty() || this.trans('No entries') }
            </div>
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
        // if ( ! this.$slots.empty ) {
        //     this.$slots.empty = [this.ctor('renderEmpty')()];
        // }

        // let slots = Arr.each(this.$slots, (slot, name) => {
        //     return h('template', { slot: name }, slot);
        // });

        // let props = Obj.assign({}, this.$props, {
        //     items: this.veItems,
        //     useRenderCache: this.useRenderCache,
        //     renderNode: this.ctor('renderItem'),
        // });

        // let events = {
        //     dragenter: this.eventEmptyDragenter,
        //     dragover: this.eventEmptyDragover,
        //     dragleave: this.eventEmptyDragleave,
        //     dragdrop: this.eventEmptyDragdrop,
        //     drop: this.eventEmptyDragdrop
        // };

        let props = Obj.except(this.$props, ['items'], {
            items: this.visible
        });

        return (
            <NVirtualscroller ref="virtualscroller" {...props}>
                { { default: this.ctor('renderItem'), empty: this.ctor('renderEmpty') } }
            </NVirtualscroller>
        );
    }

}
