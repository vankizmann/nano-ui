import { Arr, Obj, Mix } from "@kizmann/pico-js";

export default {

    cmer(classList)
    {
        let attrsList = {};

        if ( Mix.isString(classList) ) {
            attrsList[classList] = true;
        }

        if ( Mix.isArray(classList) ) {
            Arr.each(classList, (value) => attrsList[value] = true);
        }

        if ( Mix.isObj(classList) ) {
            Obj.assign(attrsList, classList);
        }

        if ( Mix.isString(this.$attrs.class) ) {
            attrsList[this.$attrs.class] = true;
        }

        if ( Mix.isArray(this.$attrs.class) ) {
            Arr.each(this.$attrs.class, (value) => attrsList[value] = true);
        }

        if ( Mix.isObj(this.$attrs.class) ) {
            Obj.assign(attrsList, this.$attrs.class);
        }

        return attrsList;
    }

}
