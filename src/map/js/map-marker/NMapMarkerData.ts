import { ProtoData } from "../../../root/index.ts";
import NMapMarkerController from "./NMapMarkerController.ts";

export class NMapMarkerData extends ProtoData
{
    /**
     * @type {NMapMarkerController}
     */
    declare scope : NMapMarkerController;

    get lat() : number
    {
        return this.scope.get('lat');
    }

    get lng() : number
    {
        return this.scope.get('lng');
    }

    get drag() : boolean
    {
        return this.scope.get('drag');
    }

    get options() : object
    {
        return this.scope.get('options');
    }

}