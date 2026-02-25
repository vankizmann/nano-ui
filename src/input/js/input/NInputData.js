import { ProtoData } from "../../../root/index.js";
import { NInputProps } from "./NInput.js";
import { Mix } from "@kizmann/pico-js";

console.log(ProtoData.prototype);

/**
 * @class NInputData
 * @extends {BaseData<NTextareaController>}
 */
export class NInputData extends ProtoData
{
    get classList()
    {
        let classList = [];

        if ( this.scope.get('focus') ) {
            classList.push('n-focus');
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

    get placeholder()
    {
        return this.scope.get('placeholder');
    }

    get focus()
    {
        return this.scope.get('focus');
    }

    set focus(value)
    {
        this.scope.set('focus', value);
    }


}

export default NInputData;