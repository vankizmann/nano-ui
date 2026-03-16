import { Arr, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NFormController as Form } from "../../form/NFormController.ts";
import { NFormItemController as FormItem } from "../../form-item/NFormItemController.ts";

export const NFormRuleMinlength = {

    key: 'minlength',

    validate(scope: Form, field : FormItem, value : any, min: number = Number.MIN_VALUE)
    {
        if ( Mix.isEmpty(value) ) {
            return true;
        }

        if ( Mix.isStr(value) || Mix.isArr(value) ) {
            return Mix.len(value) > Mix.num(min);
        }

        return false;
    },

    message(scope: Form, field : FormItem, value : any, min: number = Number.MIN_VALUE)
    {
        return Locale.trans('Length must be greater than :min', { min });
    },

};

export default NFormRuleMinlength;