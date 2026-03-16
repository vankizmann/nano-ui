import { Arr, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NFormController as Form } from "../../form/NFormController.ts";
import { NFormItemController as FormItem } from "../../form-item/NFormItemController.ts";

export const NFormRuleEmail = {

    key: 'email',

    validate(scope: Form, field : FormItem, value : any)
    {
        if ( Mix.isEmpty(value) ) {
            return true;
        }

        return Mix.str(value).match(/^.*?@.*?\.[a-z]{2,}$/);
    },

    message(scope: Form, field : FormItem, value : any)
    {
        return Locale.trans('Must be a valid email');
    },

};

export default NFormRuleEmail;