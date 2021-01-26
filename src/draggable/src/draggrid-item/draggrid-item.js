import { UUID, Num, Arr, Obj, Dom, Any, Event } from "@kizmann/pico-js";
import NDraggableItem from "../draggable-item/draggable-item";

export default {

    name: 'NDraggridItem',

    extends: NDraggableItem,

    renderNode()
    {
        let props = {
            index: this[this.NDraggable.indexProp],
            value: this.veItem,
            remove: this.remove,
            copy: this.copy,
            export: this.export,
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
            <div ref="select" class="n-draggrid-item__select">
                <NCheckbox disabled={!allowSelect} checked={isChecked} onInput={this.select} />
            </div>
        );
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
            dragenter: this.eventDragenter,
            dragover: this.eventDragover,
            dragleave: this.eventDragleave,
            dragend: this.eventDragend,
            dragdrop: this.eventDragdrop,
            drop: this.eventDragdrop
        };

        let classList = [
            'n-draggrid-item'
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
                <div class={classList} style={style}></div>
            );
        }

        let allowDrag = ! this.NDraggable.handle;
        
        // Is selectable
        allowDrag = allowDrag && (Any.isFunction(this.NDraggable.allowSelect) ?
            this.NDraggable.allowSelect(this) : this.NDraggable.allowSelect);

        // Is draggable
        allowDrag = allowDrag && (Any.isFunction(this.NDraggable.allowDrag) ?
            this.NDraggable.allowDrag(this) : this.NDraggable.allowDrag);

        // Get unique prop
        let id = this.value[this.NDraggable.uniqueProp];

        return (
            <div data-id={id} class={classList} style={style} on={events} draggable={allowDrag}>
                { this.ctor('renderNode')() }
                { this.ctor('renderSelect')() }
            </div>
        );
    }

}
