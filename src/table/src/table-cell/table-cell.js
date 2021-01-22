import { Obj } from "nano-js";

export default {

    inject: {

        NTable: {
            default: undefined
        }

    },

    props: {

        column: {
            required: true
        },

        value: {
            required: true
        },

        item: {
            required: true
        }

    },

    computed: {

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
