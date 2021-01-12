import { UUID, Num, Arr, Obj, Dom, Any, Event } from "nano-js";
import draggable from "../..";
import NDraggableItem from "../draggable-item/draggable-item";

export default {

    name: 'NDraglistItem',

    inject: {

        NDraggable: {
            default: undefined
        }
    
    },

    props: {

        value: {
            required: true
        }

    },

    computed: {

        item()
        {
            return Obj.get(this.NDraggable, this.value.route);
        }

    },

    watch: {

        'value.id': function () {
            Any.async(this.refreshBinding);
        }

    },

    mounted()
    {
        Any.async(() => this.NDraggable.drag.bindNode(this));
    },

    beforeUnmount()
    {
        Any.async(() => this.NDraggable.drag.unbindNode(this));
    },

    methods: {

        refreshBinding()
        {
            clearTimeout(this.refresh);

            this.refresh = setTimeout(() => {
                this.NDraggable.drag.bindNode(this)
            }, 150);

            this.NDraggable.drag.unbindNode(this);
        },

        hasChildren()
        {
            return !! this.getChildren().length;
        },

        getChildren()
        {
            return Obj.get(this.item, this.NDraggable.childProp, []);
        },

        isDisabled()
        {
            return false;
        },

        isDraggable()
        {
            return true;
        },

        isExpanded()
        {
            return this.NDraggable.isExpanded(this.value);
        },

        expandItem()
        {
            if ( this.hasChildren() ) {
                this.NDraggable.expandItem(this.value);
            }
        },

        isSelected()
        {
            return this.NDraggable.isSelected(this.value);
        },

        selectItem()
        {
            if ( ! this.isDisabled() ) {
                this.NDraggable.selectItem(this.value);
            }
        }

    },

    renderElement()
    {
        let props = Obj.except(this.$props, ['value'], {
            value: this.item
        });

        let renderFunction = this.$slots.default;

        if ( this.NDraggable.renderNode ) {
            renderFunction = this.NDraggable.renderNode;
        }

        return (
            <div class="n-draglist-item__element">
                { renderFunction(props) }
            </div>
        );
    },

    renderSpacer()
    {
        let depth = Obj.get(this.value, 
            this.NDraggable.depthProp, 0);

        if ( ! depth ) {
            return null;
        }

        let style = {
            width: (depth * this.NDraggable.itemOffset) + 'px'
        };

        return (
            <div class="n-draglist-item__spacer" style={style}>
                { /* SPACER */ }
            </div>
        );
    },

    renderHandle()
    {
        if ( ! this.NDraggable.renderHandle ) {
            return null;
        }

        let props = {};

        if ( this.isDraggable() ) {
            props.draggable = true;
        }

        return (
            <div class="n-draglist-item__handle" {...props}>
                <div class="n-draglist-item__ellipsis">
                    <i class={ this.icons.handle }></i>
                </div>
            </div>
        );
    },

    renderExpand()
    {
        if ( ! this.NDraggable.renderExpand ) {
            return null;
        }

        return (
            <div class="n-draglist-item__expand" onMousedown={this.expandItem}>
                <div class="n-draglist-item__angle">
                    <i class={ this.icons.angleRight }></i>
                </div>
            </div>
        );
    },

    renderSelect()
    {
        if ( ! this.NDraggable.renderSelect ) {
            return null;
        }

        return (
            <div class="n-draglist-item__select" onMousedown={this.selectItem}>
                <div class="n-draglist-item__checkbox">
                    <i class={ this.icons.checked }></i>
                </div>
            </div>
        );
    },

    render()
    {
        let classList = [
            'n-draglist-item'
        ];

        if ( this.hasChildren() ) {
            classList.push('n-children');
        }

        if ( this.isDisabled() ) {
            classList.push('n-disabled');
        }

        if ( this.isSelected() ) {
            classList.push('n-selected');
        }

        if ( this.isExpanded() ) {
            classList.push('n-expanded');
        }

        let props = {
            onClick: this.NDraggable.$emit('row-click', this),
            onDblclick: this.NDraggable.$emit('row-dblclick', this)
        };

        if ( ! this.NDraggable.handle && this.isDraggable() ) {
            props.draggable = true;
        }

        return (
            <div class={classList} {...props}>
                { this.ctor('renderSpacer')() }
                { this.ctor('renderExpand')() }
                { this.ctor('renderSelect')() }
                { this.ctor('renderElement')() }
            </div>
        );
    }

}
