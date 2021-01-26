import { UUID, Num, Arr, Obj, Dom, Any, Event, Locale } from "@kizmann/pico-js";
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
        let events = {
            dragenter: this.eventEmptyDragenter,
            dragover: this.eventEmptyDragover,
            dragleave: this.eventEmptyDragleave,
            dragdrop: this.eventEmptyDragdrop,
            drop: this.eventEmptyDragdrop
        };

        let renderItems = Arr.each(this.veItems, (value) => {
            return this.ctor('renderItem')({ value });
        });

        return this.$render('NScrollbar', {ref: 'viewport', on: events }, 
            [renderItems]);
    },

    render($render)
    {
        this.$render = $render;

        if ( ! this.$slots.empty ) {
            this.$slots.empty = [this.ctor('renderEmpty')()];
        }

        this.$slots.default = this.$slots.empty;

        if ( this.veItems.length ) {
            this.$slots.default = [this.ctor('renderItems')()];
        }

        return (
            <div class="n-draggrid">{ this.$slots.default }</div>
        );
    }

}
