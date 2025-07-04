import { Obj } from "@kizmann/pico-js";

export default {

    inject: {

        NInfo: {
            default: undefined
        }

    },

    props: {

        column: {
            required: true
        },

        item: {
            required: true
        },

    },

    computed: {

        input()
        {
            return Obj.get(this.item, this.column.prop);
        }

    },

    render()
    {
        return (
            <div>
                <span>{ this.input }</span>
            </div>
        );
    }

}
