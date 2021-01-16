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

    mounted()
    {
        this.NDraggable.drag.bindNode(this);
    },

    beforeUnmount()
    {
        this.NDraggable.drag.unbindNode(this);
    },

    methods: {

        hasChildren()
        {
            return this.NDraggable.hasChildren(this);
        },

        isDisabled()
        {
            return this.NDraggable.isDisabled(this);
        },

        isCurrent()
        {
            return this.NDraggable.isCurrent(this);
        },

        isDraggable()
        {
            return this.NDraggable.isDraggable(this);
        },

        isExpanded()
        {
            return this.NDraggable.isExpanded(this);
        },

        expandItem()
        {
            this.NDraggable.expandItem(this);
        },

        isSelected()
        {
            return this.NDraggable.isSelected(this);
        },

        selectItem()
        {
            this.NDraggable.selectItem(this);
        },

        onClick()
        {
            this.NDraggable.setCurrent(this);

            this.NDraggable.$emit('row-click', this);
        },

        onDblclick()
        {
            this.NDraggable.setCurrent(this);

            this.NDraggable.$emit('row-dblclick', this);
        }

    },

    renderElement()
    {
        let props = {
            value: this.value, item: this.item
        };

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
        let width = this.value.depth * 
            this.NDraggable.itemOffset;

        if ( ! width ) {
            return null;
        }

        let style = {
            width: width + 'px'
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

        if ( this.isCurrent() ) {
            classList.push('n-current');
        }

        let props = {
            onClick: this.onClick,
            onDblclick: this.onDblclick,
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
