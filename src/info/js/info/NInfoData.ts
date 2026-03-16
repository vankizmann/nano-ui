import { ProtoData } from "../../../root/index.ts";
import NInfoController from "./NInfoController.ts";

export class NInfoData extends ProtoData
{
    /**
     * @type {NInfoController}
     */
    declare scope : NInfoController;

    get classList() : string[]
    {
        return this.classRoot([]);
    }

    get item() : string
    {
        return this.scope.get('item');
    }

    get syncEvent() : Function
    {
        return this.scope.get('syncEvent');
    }

    get scrollbar() : boolean
    {
        return this.scope.get('scrollbar');
    }

    get renderEmpty() : boolean
    {
        return this.scope.get('renderEmpty');
    }


}

export default NInfoData;