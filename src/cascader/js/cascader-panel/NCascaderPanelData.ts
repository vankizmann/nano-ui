import { ProtoData } from "../../../root/index.ts";
import NCascaderPanelController from "./NCascaderPanelController.ts";

export class NCascaderPanelData extends ProtoData
{
    /**
     * @type {NCascaderPanelController}
     */
    declare scope : NCascaderPanelController;

    get classList() : string[]
    {
        let classList = [];

        return this.classRoot(classList);
    }

    get model() : string[]
    {
        return this.scope.get('modelValue');
    }

    get split() : string
    {
        return this.scope.get('splitValue');
    }

    get virtuals() : any
    {
        return this.scope.get('virtuals');
    }

    get visible() : string[]
    {
        return this.scope.get('visible');
    }

    get options() : any
    {
        return this.scope.get('options');
    }

    get trigger() : string
    {
        return this.scope.get('trigger');
    }

    get labelProp() : string
    {
        return this.scope.get('labelProp');
    }

    get valueProp() : string
    {
        return this.scope.get('valueProp');
    }

    get childProp() : string
    {
        return this.scope.get('childProp');
    }

    get disabledProp() : string
    {
        return this.scope.get('disabledProp');
    }

}

export default NCascaderPanelData;