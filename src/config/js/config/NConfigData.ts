import { ProtoData } from "../../../root/index.ts";
import NConfigController from "./NConfigController.ts";

export class NConfigData extends ProtoData
{
    /**
     * @type {NConfigController}
     */
    declare scope : NConfigController;

    get model() : any
    {
        return this.scope.get('modelValue');
    }

    get extra() : any
    {
        return this.scope.get('extraValue');
    }

    get config() : any
    {
        return this.scope.get('config');
    }

    get self() : any
    {
        return this.scope.get('scope');
    }

}

export default NConfigData;