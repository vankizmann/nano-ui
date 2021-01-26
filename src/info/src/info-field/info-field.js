import { Obj } from "@kizmann/pico-js";
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
            <div class="n-info__field">
                <span>{ this.input }</span>
            </div>
        );
    }

}
