import { ProtoData } from "../../../root/index.js";
import { Arr, Locale, Mix, Obj } from "@kizmann/pico-js";

/**
 * @class NCascaderPanelData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NCascaderPanelData extends ProtoData
{

    get classList()
    {
        let classList = [];

        return this.classRoot(classList);
    }

    get model()
    {
        return this.scope.get('modelValue');
    }

    get split()
    {
        return this.scope.get('splitValue');
    }

    get virtuals()
    {
        return this.scope.get('virtuals');
    }

    get visible()
    {
        return this.scope.get('visible');
    }

    get options()
    {
        return this.scope.get('options');
    }

    get trigger()
    {
        return this.scope.get('trigger');
    }

    get labelProp()
    {
        return this.scope.get('labelProp');
    }

    get valueProp()
    {
        return this.scope.get('valueProp');
    }

    get childProp()
    {
        return this.scope.get('childProp');
    }

    get disabledProp()
    {
        return this.scope.get('disabledProp');
    }

}