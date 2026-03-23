import { Arr, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NFormController as Form } from "../../form/NFormController.ts";
import { NFormItemController as FormItem } from "../../form-item/NFormItemController.ts";

export const NFormRuleRequiredIf = {

    key: 'required_if',

    validate(scope: Form, field : FormItem, value : any, key : string = '')
    {
        let target = Obj.get(scope.data.form, key);

        if ( Mix.isEmpty(target) ) {
            return true;
        }

        if ( ! Mix.isTrue(target) ) {
            return true;
        }

        if ( Mix.isBool(value) ) {
            return value === true;
        }

        return !Mix.isEmpty(value);
    },

    message(scope: Form, field : FormItem, value : any, key = '')
    {
        let label = Arr.find(scope.childs, (item : any) => {
            return item.data.prop === key;
        });

        return Locale.trans('Field is required if :label isset', {
            label: label?.data.label || key
        });
    },

};

export default NFormRuleRequiredIf;