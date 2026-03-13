import { Arr, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NFormController as Form } from "../../form/NFormController.ts";
import { NFormItemController as FormItem } from "../../form-item/NFormItemController.ts";

export const NFormRuleDiffrent = {

    key: 'diffrent',

    validate(scope: Form, field : FormItem, value : any, key : string = '')
    {
        return value !== Obj.get(scope.data.form, key);
    },

    message(scope: Form, field : FormItem, value : any, key : string = '')
    {
        let label = Arr.find(scope.childs, (item : any) => {
            return item.data.prop === key;
        });

        return Locale.trans('Must be diffrent from :label', {
            label: label?.data.label || key
        });
    },

};

export default NFormRuleDiffrent;