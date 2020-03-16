import CtorMixin from "../../../mixins/src/ctor";
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

    },

    computed: {

        input()
        {
            return Obj.get(this.value, this.column.prop);
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
