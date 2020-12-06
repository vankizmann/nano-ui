import { UUID, Num, Arr, Obj, Dom, Any, Event } from "nano-js";

export default {

    // name: 'NDraggableItem',

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
        }

    },

    computed: {

        veItem()
        {
            if ( Obj.has(this.value, 'item') ) {
                return Obj.get(this.value, 'item');
            }

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

        update(value)
        {
            Obj.set(this.NDraggable, this[this.NDraggable.pathProp] +
                '.' + this[this.NDraggable.indexProp], value);

            // this.veItem = this.getItem();

            this.NDraggable.refreshItems();
        },

        /**
         * Event listeners
         */

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

            Any.framerate(this.resolveDragPosition, 30, timer)(event.clientY, event.clientX);
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
            event.stopPropagation();

            this.NDraggable.$emit('dragdrop', event, this, this.strategy);
        },

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

            if ( this.NDraggable.renderSelect && Arr.has(this.NDraggable.veKeyBuffer, 91) ) {
                this.select();
            }

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

    },

    mounted()
    {
        Any.delay(() => this.veInit = true, 25);
    }

}
