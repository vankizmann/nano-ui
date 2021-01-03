import { UUID, Num, Arr, Obj, Dom, Any, Event } from "nano-js";
import NDraggableItem from "../draggable-item/draggable-item";

export default {

    name: 'NDraglistItem',

    extends: NDraggableItem,

    renderNode()
    {
        let props = {
            index: this[this.NDraggable.indexProp],
            value: this.veItem,
            remove: this.remove,
            copy: this.copy
        };

        let renderNode = null;

        if ( Any.isFunction(this.NDraggable.renderNode) ) {
            renderNode = this.NDraggable.renderNode(props);
        }

        if ( Any.isString(this.NDraggable.renderNode) ) {
            renderNode = this.$render(this.NDraggable.renderNode, { props })
        }

        if ( Any.isEmpty(renderNode) && this.$scopedSlots.default ) {
            renderNode = this.$scopedSlots.default(props);
        }

        let attrs = {
            width: '100%', flex: '1 1 auto'
        };

        return (
            this.NDraggable.wrapNode ? this.$render('div', { attrs }, [renderNode]) : renderNode
        );
    },

    renderSpacer()
    {
        if ( ! this[this.NDraggable.depthProp] ) {
            return null;
        }

        let style = {
            width: (this.depth * this.NDraggable.itemOffset) + 'px'
        };

        return (
            <div class="n-draglist-item__spacer" style={style}>
                { /* SPACER */}
            </div>
        );
    },

    renderExpand()
    {
        if ( ! this.NDraggable.renderExpand ) {
            return null;
        }

        let childLength = Obj.get(this.veItem,
            this.NDraggable.childProp, []).length;

        return (
            <div class="n-draglist-item__expand">
                { !! childLength &&
                    <div ref="expand" on={{ click: this.expand }}>
                        <i class={ this.icons.angleRight }></i>
                    </div>
                }
            </div>
        )
    },

    renderSelect()
    {
        if ( ! this.NDraggable.renderSelect ) {
            return null;
        }

        let allowSelect = this.NDraggable.canSelect(this);

        allowSelect = allowSelect && (Any.isFunction(this.NDraggable.allowSelect) ?
            this.NDraggable.allowSelect(this) : this.NDraggable.allowSelect);

        let isChecked = this.NDraggable.isSelected(this);

        // TODO: Decouple is checked from draggable (Not anynmore?)

        return (
            <div ref="select" class="n-draglist-item__select">
                <NCheckbox disabled={!allowSelect} checked={isChecked} onInput={this.select} />
            </div>
        )
    },

    render($render)
    {
        this.$render = $render;

        let style = {};

        if ( this.NDraggable.itemHeight ) {
            style.height = this.NDraggable.itemHeight + 'px'
        }

        let isBelowThreshold = this.NDraggable.veItems.length <=
            this.NDraggable.threshold;

        if ( ! this.NDraggable.ghostMode || isBelowThreshold ) {
            this.veInit = true;
        }

        let events = {
            click: this.eventClick,
            dblclick: this.eventDblclick,
            dragstart: this.eventDragstart,
            dragenter: this.eventDragenter,
            dragover: this.eventDragover,
            dragleave: this.eventDragleave,
            dragend: this.eventDragend,
            dragdrop: this.eventDragdrop,
            drop: this.eventDragdrop
        };

        let classList = [
            'n-draglist-item'
        ];

        if ( this.NDraggable.isSelected(this) ) {
            classList.push('n-selected');
        }

        if ( this.NDraggable.isCurrent(this) ) {
            classList.push('n-current');
        }

        if ( this.NDraggable.isExpanded(this) ) {
            classList.push('n-expanded');
        }

        if ( ! this.veInit ) {

            classList.push('n-ghost');

            return (
                <div class={classList} style={style}>
                    { this.ctor('renderSpacer')() }
                </div>
            );
        }

        let allowDrag = (Any.isFunction(this.NDraggable.allowSelect) ?
            this.NDraggable.allowSelect(this) : this.NDraggable.allowSelect);

        // Is selectable and can be dragged
        allowDrag = allowDrag && (Any.isFunction(this.NDraggable.allowDrag) ?
            this.NDraggable.allowDrag(this) : this.NDraggable.allowDrag);

        // Get unique prop
        let id = this.value[this.NDraggable.uniqueProp];

        return (
            <div data-id={id} class={classList} style={style} on={events} draggable={allowDrag}>
                { this.ctor('renderSpacer')() }
                { this.ctor('renderExpand')() }
                { this.ctor('renderSelect')() }
                { this.ctor('renderNode')() }
            </div>
        );
    }

}
