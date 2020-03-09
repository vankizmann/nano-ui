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

        position: {
            default()
            {
                return 0;
            }
        },

    },

    computed: {

        veItem()
        {
            return Obj.get(this.NDraggable, this[this.NDraggable.pathProp] +
                '.' + this[this.NDraggable.indexProp]);
        }

    },

    data()
    {
        return Obj.assign({ veInit: false, strategy: 'nodrop' }, this.value);
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

            let allowDropAfter = this.NDraggable.isExpanded(this) ||
                ! Obj.get(this.veItem, this.NDraggable.childProp, []).length;

            if ( clientY < safeZone && allowDropAfter ) {

                finalStrategy = 'after';

                finalPositon = parentY + this.$el.clientHeight;
            }

            // Does not itself and child
            let allowDrop = this.NDraggable.canDrop(this);

            if ( allowDrop ) {

                // For perfomance optimization only if allowDrop
                let target = this.NDraggable.getTarget(this);

                let allowDropRainbow = Arr.each(this.NDraggable.veCached, (source) => {
                    return !! this.NDraggable.allowDrop(source, target, finalStrategy);
                });

                allowDrop &= ! Arr.has(allowDropRainbow, false);
            }

            if ( ! allowDrop ) {

                finalStrategy = 'nodrop';

                Dom.find(this.$el).addClass('n-nodrop');
            }

            Dom.find(this.$el).addClass('n-dragover');

            this.NDraggable.updateDragIndicator(finalPositon !== -1 &&
                finalStrategy !== 'nodrop', finalPositon || 1);

            this.strategy = finalStrategy;
        },

        expand(event)
        {
            this.NDraggable.expandItem(this);
        },

        select(event)
        {
            this.NDraggable.toggleItem(this);
        },

        remove(event)
        {
            this.NDraggable.removeItem(this);
        },

        copy(event)
        {
            this.NDraggable.copyItem(this);
        },

        /**
         * Event listeners
         */

        eventClick(event)
        {
            let isExpand = Dom.find(event.target).closest(this.$refs.expand);

            if ( this.$refs.expand && isExpand ) {
                return;
            }

            let isSelect = Dom.find(event.target).closest(this.$refs.select);

            if ( this.$refs.select && isSelect ) {
                return;
            }

            let target = this.NDraggable.getTarget(this);

            this.NDraggable.$emit('row-click', target);
        },

        eventDblclick(event)
        {
            let isExpand = Dom.find(event.target).closest(this.$refs.expand);

            if ( this.$refs.expand && isExpand ) {
                return;
            }

            let isSelect = Dom.find(event.target).closest(this.$refs.select);

            if ( this.$refs.select && isSelect ) {
                return;
            }

            let target = this.NDraggable.getTarget(this);

            this.NDraggable.$emit('row-dblclick', target);
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
            if ( ! this.NDraggable.veCached.length ) {
                return;
            }

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

            Any.framerate(this.resolveDragPosition, 30, timer)(event.clientY);
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

    mounted()
    {
        Any.delay(() => this.veInit = true, 25);
    },

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
            <div class="n-draggable-item__spacer" style={style}>
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
            <div class="n-draggable-item__expand">
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

        allowSelect &= Any.isFunction(this.NDraggable.allowSelect) ?
            this.NDraggable.allowSelect(this) : this.NDraggable.allowSelect;

        let isChecked = this.NDraggable.isSelected(this);

        // TODO: Decouple is checked from draggable

        return (
            <div ref="select" class="n-draggable-item__select">
                <NCheckbox disabled={!allowSelect} checked={isChecked} onInput={this.select} />
            </div>
        )
    },

    render($render)
    {
        this.$render = $render;

        let style = {
            height: this.NDraggable.itemHeight + 'px'
        };

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
            'n-draggable-item'
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

        let draggable = this.NDraggable.allowSelect(this);

        // Is selectable and can be dragged
        draggable &= Any.isFunction(this.NDraggable.allowDrag) ?
            this.NDraggable.allowDrag(this) : this.NDraggable.allowDrag;

        return (
            <div data-key={this.$vnode.key} class={classList} style={style} on={events} draggable={draggable}>
                { this.ctor('renderSpacer')() }
                { this.ctor('renderExpand')() }
                { this.ctor('renderSelect')() }
                { this.ctor('renderNode')() }
            </div>
        );
    }

}
