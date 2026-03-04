import { ProtoData } from "../../../root/index.ts";
import NTagController from "./NTagController.ts";

export class NTagData extends ProtoData
{
    /**
     * @type {NTagController}
     */
    declare scope : NTagController;

    get classList() : string[]
    {
        return this.classRoot([]);
    }

}

export default NTagData;