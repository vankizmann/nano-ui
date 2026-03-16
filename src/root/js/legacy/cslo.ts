import { Comment } from "vue";

export const cslo = function (slot : string = 'default', props : any = {}) {

    if ( ! this.$slots[slot] ) {
        return false;
    }

    return this.$slots[slot](props).findIndex((o : any) => {
        return o.type !== Comment;
    }) !== -1;
}

export default cslo;