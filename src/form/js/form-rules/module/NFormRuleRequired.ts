import { Arr, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NFormController as Form } from "../../form/NFormController.ts";
import { NFormItemController as FormItem } from "../../form-item/NFormItemController.ts";

export const NFormRuleRequired = {

    key: 'required',

    validate(scope: Form, field : FormItem, value : any)
    {
        if ( Mix.isBool(value) ) {
            return value === true;
        }

        return !Mix.isEmpty(value);
    },

    message(scope: Form, field : FormItem, value : any)
    {
        return Locale.trans('Field is required');
    },

};

export default NFormRuleRequired;