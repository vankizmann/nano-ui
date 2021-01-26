import { Obj } from "@kizmann/pico-js";

export default {

    inject: {

        NTable: {
            default: undefined
        },

        NDraggableItem: {
            default: undefined
        }

    },

    props: {

        column: {
            required: true
        }

    },

    computed: {

        uid()
        {
            return Obj.get(this._, 'vnode.key');
        },

        item()
        {
            return this.NDraggableItem.item;
        },

        value()
        {
            return this.NDraggableItem.value;
        },

        input()
        {
            return Obj.get(this.item, this.column.prop);
        }

    },

    render()
    {
        if ( this.column.$slots.default ) {
            return this.column.$slots.default(this);
        }
        
        return (
            <div>
                <span>{ this.input }</span>
            </div>
        );
    }

}
