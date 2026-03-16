import { Arr, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NFormController as Form } from "../../form/NFormController.ts";
import { NFormItemController as FormItem } from "../../form-item/NFormItemController.ts";

export const NFormRuleMin = {

    key: 'min',

    validate(scope: Form, field : FormItem, value : any, min: number = Number.MIN_VALUE)
    {
        if ( Mix.isEmpty(value) ) {
            return true;
        }

        if ( Mix.isNum(value) ) {
            return value >= Mix.num(min);
        }

        return false;
    },

    message(scope: Form, field : FormItem, value : any, min: number = Number.MIN_VALUE)
    {
        return Locale.trans('Must be greather than :min', { min });
    },

};

export default NFormRuleMin;