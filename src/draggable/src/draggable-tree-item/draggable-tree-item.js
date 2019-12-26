import { Arr, Any } from "nano-js";

export default {

    name: 'NDraggableTreeItem',

    inject: {
        NDraggableTree: {
            default: undefined
        }
    },

    props: {

        value: {
            default()
            {
                return {};
            },
            type: [Object]
        }

    },

    computed: {

        empty()
        {
            return Any.isEmpty(this.value[this.NDraggableTree
                .childProp]) === true;
        },

        selected()
        {
            return Arr.last(this.NDraggableTree.cascade) ===
                this.value[this.NDraggableTree.uniqueProp];
        },

        expanded()
        {
            return Arr.has(this.NDraggableTree.expanded,
                this.value[this.NDraggableTree.uniqueProp]);
        }

    },

    methods: {

        expandItem()
        {
            this.$emit('expand', this.value[this.NDraggableTree.uniqueProp]);
        },

        cascadeItem()
        {
            this.$emit('cascade', this.value[this.NDraggableTree.uniqueProp]);
        }

    },

    render(h)
    {

        let className = [
            'n-draggable-tree-item'
        ];

        if ( this.empty === true ) {
            className.push('n-draggable-tree-item--empty');
        }

        if ( this.selected === true ) {
            className.push('n-draggable-tree-item--selected');
        }

        if ( this.expanded === true ) {
            className.push('n-draggable-tree-item--expanded');
        }

        let style = {
            paddingLeft: (this.NDraggableTree.depth *
                this.NDraggableTree.depthOffset) + 'px'
        };

        return (
            <div class={className} style={style} vOn:click={this.cascadeItem}>
                <div class="n-draggable-tree-item__expand" vOn:click_stop={this.expandItem}>
                    <span class={this.icons.angleRight}></span>
                </div>
                <div class="n-draggable-tree-item__body">
                    { this.$slots.default || this.$scopedSlots.default({ value: this.value, key: this.$vnode.key }) }
                </div>
            </div>
        );
    }

}
