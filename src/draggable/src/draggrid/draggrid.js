import { UUID, Num, Arr, Obj, Dom, Any, Event, Locale } from "nano-js";
import NDraggable from "../draggable/draggable";

export default {

    name: 'NDraggrid',

    extends: NDraggable,

    props: {

        safeZone: {
            default()
            {
                return (height) => -2;
            }
        },

        itemHeight: {
            default()
            {
                return 120;
            },
            type: [Number]
        },

        viewportHeight: {
            default()
            {
                return false;
            }
        },

        scrollTopOnChange: {
            default()
            {
                return false;
            }
        },

        wrapNode: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

    },

    renderEmpty()
    {
        if ( ! this.showEmpty ) {
            return null;
        }

        console.log('renderEmpty')

        return (
            <div class="n-draggrid__empty">
                 <span>{ this.$slots.empty || this.trans('No entries') }</span>
            </div>
        );
    },

    renderItem(props)
    {
        let data = {
            key: props.value[this.keyProp], props
        };

        return (
            this.$render('NDraggridItem', data, [this.$scopedSlots.default])
        );
    },

    renderItems()
    {
        return Arr.each(this.veItems, (value) => {
            return this.ctor('renderItem')({ value });
        });
    },

    render($render)
    {
        this.$render = $render;

        if ( ! this.$slots.empty ) {
            this.$slots.default = [this.ctor('renderEmpty')()];
        }

        this.$slots.default = this.$slots.empty;

        if ( this.veItems.length ) {
            this.$slots.default = [this.ctor('renderItems')()];
        }

        console.log(this.veItems.length);

        let slots = Arr.each(this.$slots, (slot, name) => {
            return this.$render('template', { slot: name }, slot);
        });

        let props = Obj.assign({}, this.$props, {
            items: this.veItems,
            useRenderCache: this.useRenderCache,
            renderNode: this.ctor('renderItem'),
        });

        let events = {
            dragenter: this.eventEmptyDragenter,
            dragover: this.eventEmptyDragover,
            dragleave: this.eventEmptyDragleave,
            dragdrop: this.eventEmptyDragdrop,
            drop: this.eventEmptyDragdrop
        };

        return (
            <div class="n-draggrid">
            {
                this.$render('NScrollbar', {
                    ref: 'viewport', class: '', on: events, props: props
                 }, slots)
            }
            </div>
        );
    }

}
