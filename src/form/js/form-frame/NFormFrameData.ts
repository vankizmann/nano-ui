import { ProtoData } from "../../../root/index.ts";
import NFormFrameController from "./NFormFrameController.ts";

export class NFormFrameData extends ProtoData
{
    /**
     * @type {NFormFrameController}
     */
    declare scope : NFormFrameController;

    get classList() : string[]
    {
        return this.classRoot([]);
    }

    get placeholder() : string
    {
        return this.scope.get('placeholder');
    }

}

export default NFormFrameData;