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
        return (
            <div class="n-table-cell">
                <span>{ this.input }</span>
            </div>
        );
    }

}
