import { Arr, Mix } from "@kizmann/pico-js";

type Constructor = new (...args: any[]) => any;

export const ProtoExtend: any = (values: Constructor[], construct: boolean = true): Constructor => {

    let First: Constructor = class { };

    if ( values.length && construct ) {
        First = values[0];
    }

    Arr.each(values, (value: Constructor) => {
        Mix.extend(First.prototype, value.prototype);
    });

    return First;
}

export default ProtoExtend;