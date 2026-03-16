import { Arr, Obj, Mix } from "@kizmann/pico-js";

export const cmer = function(classList : any) {

    let attrsList = {};

    if ( Mix.isStr(classList) ) {
        attrsList[classList] = true;
    }

    if ( Mix.isArr(classList) ) {
        Arr.each(classList, (value : any) => attrsList[value] = true);
    }

    if ( Mix.isObj(classList) ) {
        Obj.assign(attrsList, classList);
    }

    if ( Mix.isStr(this.$attrs.class) ) {
        attrsList[this.$attrs.class] = true;
    }

    if ( Mix.isArr(this.$attrs.class) ) {
        Arr.each(this.$attrs.class, (value : any) => attrsList[value] = true);
    }

    if ( Mix.isObj(this.$attrs.class) ) {
        Obj.assign(attrsList, this.$attrs.class);
    }

    return attrsList;
}

export default cmer;