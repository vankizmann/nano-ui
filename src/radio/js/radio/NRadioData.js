import { ProtoData } from "../../../root/index.js";
import { Arr } from "@kizmann/pico-js";

/**
 * @class NRadioData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NRadioData extends ProtoData
{

    get classList()
    {
        let classList = this.classRoot();

        if ( this.model === this.value ) {
            Arr.append(classList, 'n-checked');
        }

        return classList;
    }

    get model()
    {
        return this.scope.get('modelValue');
    }

    get value()
    {
        return this.scope.get('value');
    }

}