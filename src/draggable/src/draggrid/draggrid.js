import { UUID, Num, Arr, Obj, Dom, Any, Event, Locale } from "nano-js";
import NDraggable from "../draggable/draggable";

export default {

    name: 'NDraggrid',

    extends: NDraggable,

    props: {

        safeZone: {
            default()
            {
                return (height) => height * 0.51;
            }
        },

        itemHeight: {
            default()
            {
                return 34;
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
                return true;
            }
        },

        wrapNode: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        bufferItems: {
            default()
            {
                return 10;
            },
            type: [Number]
        },

        threshold: {
            default()
            {
                return 100;
            },
            type: [Number]
        },

        useRenderCache: {
            default()
            {
                return true;
            },
            type: [Boolean]
        }

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
            this.$render('NDraglistItem', data, [this.$scopedSlots.default])
        );
    },

    render($render)
    {
        this.$render = $render;

        if ( ! this.$slots.empty ) {
            this.$slots.empty = [this.ctor('renderEmpty')()];
        }

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
            this.$render('NVirtualscroller', {
               ref: 'vscroller', class: 'n-draggrid', on: events, props: props
            }, slots)
        );
    }

}
