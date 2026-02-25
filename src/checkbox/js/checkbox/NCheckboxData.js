import { ProtoData } from "../../../root/index.js";
import { Arr } from "@kizmann/pico-js";

/**
 * @class NCheckboxData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NCheckboxData extends ProtoData
{

    get classList()
    {
        let classList = this.classRoot();

        if ( this.model ) {
            Arr.append(classList, 'n-checked');
        }

        if ( this.model && this.allowUncheck ) {
            Arr.remove(classList, 'n-disabled');
        }

        if ( this.intermediate ) {
            Arr.append(classList, 'n-intermediate');
        }

        return classList;
    }

    get model()
    {
        return this.scope.get('modelValue');
    }

    set model(value)
    {
        this.scope.update('modelValue', value);
    }

    get value()
    {
        return this.scope.get('value');
    }

    get allowUncheck()
    {
        return this.scope.get('allowUncheck');
    }

    get global()
    {
        return this.scope.get('global');
    }

    get intermediate()
    {
        return this.scope.get('intermediate');
    }

}