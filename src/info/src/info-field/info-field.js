import { Nano } from "nano-js";
import CtorMixin from "../../../mixins/src/ctor";

let { Obj } = Nano;

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

        value()
        {
            return Obj.get(this.item, this.column.prop);
        }

    },

    methods: {

        ...CtorMixin,

    },

    render()
    {
        return <div class="n-info__field">
            <span>{ this.value }</span>
        </div>;
    }

}
