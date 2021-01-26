import { Arr, Obj, Any } from "@kizmann/pico-js";

export default {

    cmer(classList)
    {
        let attrsList = {};

        if ( Any.isString(classList) ) {
            attrsList[classList] = true;
        }

        if ( Any.isArray(classList) ) {
            Arr.each(classList, (value) => attrsList[value] = true);
        }

        if ( Any.isPlain(classList) ) {
            Obj.assign(attrsList, classList);
        }

        if ( Any.isString(this.$attrs.class) ) {
            attrsList[this.$attrs.class] = true;
        }

        if ( Any.isArray(this.$attrs.class) ) {
            Arr.each(this.$attrs.class, (value) => attrsList[value] = true);
        }

        if ( Any.isPlain(this.$attrs.class) ) {
            Obj.assign(attrsList, this.$attrs.class);
        }

        return attrsList;
    }

}
