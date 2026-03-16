import { Arr, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NFormController as Form } from "../../form/NFormController.ts";
import { NFormItemController as FormItem } from "../../form-item/NFormItemController.ts";

export const NFormRuleValue = {

    key: 'value',

    validate(scope: Form, field : FormItem, value : any, val: string = '')
    {
        return Mix.str(value) === val;
    },

    message(scope: Form, field : FormItem, value : any, val: string = '')
    {
        return Locale.trans('Must be exact value ":val"', { val });
    },

};

export default NFormRuleValue;