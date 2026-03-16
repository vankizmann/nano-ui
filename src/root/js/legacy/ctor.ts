import { Arr, Obj } from "@kizmann/pico-js";

export const ctor = function (key : string, fallback = null) {

    let ctor = Obj.get(this.$options, key.split('.'), -1);

    // if ( ctor === -1 ) {
    //     ctor = Obj.get(this.$vnode.componentOptions.Ctor,
    //         Arr.merge(['options'], key.split('.')), -1);
    // }

    if ( ctor === -1 ) {
        ctor = fallback;
    }

    if ( typeof ctor !== 'function' ) {
        return ctor;
    }

    return (...args : [...any]) => ctor.apply(this, args);
}

export default ctor;
