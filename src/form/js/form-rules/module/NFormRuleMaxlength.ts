import { Arr, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NFormController as Form } from "../../form/NFormController.ts";
import { NFormItemController as FormItem } from "../../form-item/NFormItemController.ts";

export const NFormRuleMaxlength = {

    key: 'maxlength',

    validate(scope: Form, field : FormItem, value : any, max: number = Number.MAX_VALUE)
    {
        if ( Mix.isEmpty(value) ) {
            return true;
        }

        if ( Mix.isStr(value) || Mix.isArr(value) ) {
            return Mix.len(value) < Mix.num(max);
        }

        return false;
    },

    message(scope: Form, field : FormItem, value : any, max: number = Number.MAX_VALUE)
    {
        return Locale.trans('Length must be lesser than :max', { max });
    },

};

export default NFormRuleMaxlength;