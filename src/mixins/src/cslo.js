import { Arr, Obj, Mix } from "@kizmann/pico-js";
import { Comment } from "vue";

export default {

    cslo(slot = 'default', props = {})
    {
        if ( ! this.$slots[slot] ) {
            return false;
        }

        return this.$slots[slot](props).findIndex((o) => {
            return o.type !== Comment;
        }) !== -1;
    }

}
