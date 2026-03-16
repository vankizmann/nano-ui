import { ProtoData } from "../../../root/index.ts";
import NDropzoneController from "./NDropzoneController.ts";

export class NDropzoneData extends ProtoData
{
    /**
     * @type {NDropzoneController}
     */
    declare scope : NDropzoneController;

    get classList() : string[]
    {
        return this.classRoot([]);
    }

    get item() : any
    {
        return this.scope.get('item');
    }

    get allowGroups() : string[]
    {
        return this.scope.get('allowGroups');
    }

}

export default NDropzoneData;