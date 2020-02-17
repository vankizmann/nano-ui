import { UUID, Num, Arr, Obj, Dom, Any, Event } from "nano-js";

export default {

    name: 'NDraggableItem',

    inject: {

        NDraggable: {
            default: undefined
        }

    },

    props: {

        value: {
            default()
            {
                return {};
            }
        },

    },

    computed: {

        item()
        {
            return Obj.get(this.NDraggable, `${this[this.NDraggable.pathProp]}.` +
                `${this[this.NDraggable.indexProp]}`);
        }

    },

    data()
    {
        return Obj.assign({ strategy: 'nodrop' }, this.value);
    },

    provide()
    {
        return {
            NDraggableItem: this
        }
    },

    methods: {

        resolveDragPosition(eventY)
        {
            let safeZone = this.NDraggable.safeZone(this.$el.clientHeight);

            let targetY = Dom.find(this.$el).offset('top', document) -
                Dom.find(this.$el).scroll('top', document);

            let parentY = Dom.find(this.$el).offset('top', this.NDraggable.$el) -
                Dom.find(this.$el).scroll('top', this.NDraggable.$el);

            let clientY = targetY + this.$el.clientHeight - eventY;

            let finalPositon = -1,  finalStrategy = 'inner';

            if ( clientY > this.$el.clientHeight - safeZone ) {

                finalStrategy = 'before';

                finalPositon = parentY;
            }

            let allowDropAfter = this.NDraggable.isCollapsed(this) ||
                ! Obj.get(this.item, this.NDraggable.childProp, []).length;

            if ( clientY < safeZone && allowDropAfter ) {

                finalStrategy = 'after';

                finalPositon = parentY + this.$el.clientHeight;
            }

            let allowDrop = this.NDraggable.canDrop(this) &&
                this.NDraggable.allowDrop(this);

            if ( ! allowDrop ) {

                finalStrategy = 'nodrop';

                Dom.find(this.$el).addClass('n-nodrop');
            }

            Dom.find(this.$el).addClass('n-dragover');

            this.NDraggable.updateDragIndicator(finalPositon !== -1 &&
                finalStrategy !== 'nodrop', finalPositon || 1);

            this.strategy = finalStrategy;
        },

        collapse(event)
        {
            this.NDraggable.collapseItem(this);
        },

        select(event)
        {
            this.NDraggable.toggleItem(this);
        },

        /**
         * Event listeners
         */

        eventClick(event)
        {
            console.log('click0', this.item);
        },

        eventDragstart(event)
        {
            this.NDraggable.selectItem(this,
                ! this.NDraggable.isSelected(this));

            this.NDraggable.$emit('dragstart', event, this);
        },

        eventDragenter(event)
        {
            event.preventDefault();

            return false;
        },

        eventDragover(event)
        {
            event.preventDefault();

            if ( this.dragoverFrames === undefined ) {
                this.dragoverFrames = 0;
            }

            let timer = (val = null) => {

                if ( ! Any.isEmpty(val) ) {
                    this.dragoverFrames = val;
                }

                return this.dragoverFrames;
            };

            Any.framerate(this.resolveDragPosition, 10, timer)(event.clientY);
        },

        eventDragleave(event)
        {
            Dom.find(this.$el).removeClass('n-dragover n-nodrop');
        },

        eventDragend(event)
        {
            this.NDraggable.removeDragCounter(event);

            this.NDraggable.$emit('dragend', event, this);

            Event.fire('draggable.stop');
        },


        eventDragdrop(event)
        {
            Dom.find(this.$el).removeClass('n-dragover n-nodrop');

            if ( this.strategy === 'nodrop' ) {

                this.NDraggable.$emit('dragend', event, this);

                return Event.fire('draggable.stop');
            }

            event.preventDefault();

            this.NDraggable.$emit('dragdrop', event, this, this.strategy);
        },

    },

    renderNode()
    {
        let props = {
            index: this[this.NDraggable.indexProp],
            value: this.item
        };

        if ( Any.isFunction(this.NDraggable.renderNode) ) {
            return (
                <td>
                    { this.NDraggable.renderNode(props) }
                </td>
            );
        }

        if ( Any.isString(this.NDraggable.renderNode) ) {
            return (
                <td>
                    { this.$render(this.NDraggable.renderNode, { props }) }
                </td>
            );
        }

        return (
            <td>{ this.$scopedSlots.default(props) }</td>
        );
    },

    renderSpacer()
    {
        return (
            <td class="n-draggable-item__spacer" align="center" width={this.depth * 20}>
                { /* SPACER */}
            </td>
        )
    },

    renderCollapse()
    {
        if ( ! this.NDraggable.renderCollapse ) {
            return;
        }

        let childsLength = Obj.get(this.item,
            this.NDraggable.childProp, []).length;

        return (
            <td class="n-draggable-item__collapse" align="center" width={25}>
                { !! childsLength &&
                    <div on={{ click: this.collapse }}>
                        <i class={ window.NanoIcons.angleRight }></i>
                    </div>
                }
            </td>
        )
    },

    renderSelect()
    {
        if ( ! this.NDraggable.renderSelect ) {
            return;
        }

        let allowSelect = this.NDraggable.allowSelect(this) &&
            this.NDraggable.canSelect(this);

        return (
            <td class="n-draggable-item__select" align="center" width={25}>
                <NCheckbox key={UUID()} size="small" disabled={!allowSelect} checked={this.NDraggable.isSelected(this)} onInput={this.select} />
            </td>
        )
    },

    render($render)
    {
        this.$render = $render;

        let events = {
            click: this.eventClick,
            dragstart: this.eventDragstart,
            dragenter: this.eventDragenter,
            dragover: this.eventDragover,
            dragleave: this.eventDragleave,
            dragend: this.eventDragend,
            dragdrop: this.eventDragdrop,
            drop: this.eventDragdrop
        };

        let classList = [
            'n-draggable-item'
        ];

        if ( this.NDraggable.isSelected(this) ) {
            classList.push('n-selected');
        }

        if ( this.NDraggable.isCollapsed(this) ) {
            classList.push('n-collapsed');
        }

        let draggable = this.NDraggable.allowSelect(this) &&
            this.NDraggable.allowDrag(this);

        return (
            <table class={classList} width="100%" height={this.NDraggable.itemHeight} on={events} data-id={this.id} draggable={draggable}>
                <tr>
                    { this.ctor('renderSpacer')() }
                    { this.ctor('renderCollapse')() }
                    { this.ctor('renderSelect')() }
                    { this.ctor('renderNode')() }
                </tr>
            </table>
        )
    }

}
