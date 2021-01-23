import { Arr, Obj, Any } from "nano-js";
import { Comment } from 'vue';

export default {

    cslo(slot = 'default')
    {
        if ( ! this.$slots[slot] ) {
            return false;
        }

        return this.$slots[slot]().findIndex((o) => {
            return o.type !== Comment;
        }) !== -1;
    }

}
