import { NDrawerController } from "./NDrawerController.ts";
import { NModalData } from "../modal/NModalData.ts";

export class NDrawerData extends NModalData
{
    /**
     * @type {NDrawerController}
     */
    declare scope : NDrawerController;

}

export default NDrawerData;