import { Arr, Mix, Obj } from "@kizmann/pico-js";
import NFormController from "../form/NFormController.ts";
import NFormItemController from "../form-item/NFormItemController.ts";
import NFormRuleRequired from "./module/NFormRuleRequired.ts";
import NFormRuleRequiredIf from "./module/NFormRuleRequiredIf.ts";
import NFormRuleRequiredUnless from "./module/NFormRuleRequiredUnless.ts";
import NFormRuleSame from "./module/NFormRuleSame.ts";
import NFormRuleDiffrent from "./module/NFormRuleDiffrent.ts";
import NFormRuleValue from "./module/NFormRuleValue.ts";
import NFormRuleEmail from "./module/NFormRuleEmail.ts";
import NFormRuleMin from "./module/NFormRuleMin.ts";
import NFormRuleMax from "./module/NFormRuleMax.ts";
import NFormRuleMinlength from "./module/NFormRuleMinlength.ts";
import NFormRuleMaxlength from "./module/NFormRuleMaxlength.ts";


export class NFormRuleHandler
{
    static rules : any = {
        [NFormRuleRequired.key]: NFormRuleRequired,
        [NFormRuleRequiredIf.key]: NFormRuleRequiredIf,
        [NFormRuleRequiredUnless.key]: NFormRuleRequiredUnless,
        [NFormRuleSame.key]: NFormRuleSame,
        [NFormRuleDiffrent.key]: NFormRuleDiffrent,
        [NFormRuleValue.key]: NFormRuleValue,
        [NFormRuleEmail.key]: NFormRuleEmail,
        [NFormRuleMin.key]: NFormRuleMin,
        [NFormRuleMax.key]: NFormRuleMax,
        [NFormRuleMinlength.key]: NFormRuleMinlength,
        [NFormRuleMaxlength.key]: NFormRuleMaxlength,
    };

    static init() : NFormRuleHandler
    {
        return this;
    }

    static register(key : string, rule : any): NFormRuleHandler
    {
        this.rules[key] = rule;

        return this;
    }

    static test(scope : NFormController, field : NFormItemController) : string[]
    {
        const [errors, value] = [
            [], Obj.get(scope.data.form, field.data.prop)
        ];

        Arr.each(field.data.rules || [], (rule : string) => {

            let [name, ...args] = rule.split(':');

            if ( ! this.rules[name] ) {
                return;
            }

            const valid = this.rules[name].validate(...[
                scope, field, value, ...args
            ]);

            if ( valid ) {
                return;
            }

            const message = this.rules[name].message(...[
                scope, field, value, ...args
            ]);

            Arr.append(errors, message);
        });

        return errors;
    }

}

export default NFormRuleHandler;