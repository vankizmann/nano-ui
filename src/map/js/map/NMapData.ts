import { ProtoData } from "../../../root/index.ts";
import NMapController from "./NMapController.ts";

export class NMapData extends ProtoData
{
    /**
     * @type {NMapController}
     */
    declare scope : NMapController;

    get classList() : string[]
    {
        return this.classRoot([]);
    }

    get lat() : number
    {
        return this.scope.get('lat');
    }

    get lng() : number
    {
        return this.scope.get('lng');
    }

    get zoom() : number
    {
        return this.scope.get('zoom');
    }

}

export default NMapData;