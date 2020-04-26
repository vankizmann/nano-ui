import { Obj } from "nano-js";
import CtorMixin from "../../../mixins/src/ctor";

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

        value: {
            required: true
        },

    },

    computed: {

        veValue()
        {
            return Obj.get(this.value, this.column.prop);
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
