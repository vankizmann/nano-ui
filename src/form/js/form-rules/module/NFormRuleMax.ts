import { Arr, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NFormController as Form } from "../../form/NFormController.ts";
import { NFormItemController as FormItem } from "../../form-item/NFormItemController.ts";

export const NFormRuleMax = {

    key: 'max',

    validate(scope: Form, field : FormItem, value : any, max: number = Number.MAX_VALUE)
    {
        if ( Mix.isEmpty(value) ) {
            return true;
        }

        if ( Mix.isNum(value) ) {
            return value <= Mix.num(max);
        }

        return false;
    },

    message(scope: Form, field : FormItem, value : any, max: number = Number.MAX_VALUE)
    {
        return Locale.trans('Must be lesser than :max', { max });
    },

};

export default NFormRuleMax;