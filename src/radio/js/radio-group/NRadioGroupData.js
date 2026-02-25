import { ProtoData } from "../../../root/index.js";
import { Mix } from "@kizmann/pico-js";

/**
 * @class NRadioGroupData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NRadioGroupData extends ProtoData
{

    get classList()
    {
        let classList = [];

        if ( this.align ) {
            classList.push(`:bem--${this.align}`);
        }

        return this.classRoot(classList);
    }

    get model()
    {
        return this.scope.get('modelValue');
    }

    set model(value)
    {
        this.scope.update('modelValue', value);
    }

    get align()
    {
        return this.scope.get('align');
    }

}