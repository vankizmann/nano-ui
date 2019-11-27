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

        row: {
            required: true
        },

    },

    computed: {

        value()
        {
            return Obj.get(this.row, this.column.prop);
        }

    },

    methods: {

        ...CtorMixin,

    },

    render()
    {
        return <div class="n-table__cell">
            <span>{ this.value }</span>
        </div>;
    }

}
