import { ProtoData } from "../../../root/index.ts";
import NPopoverGroupController from "./NPopoverGroupController.ts";

export class NPopoverGroupData extends ProtoData
{
    /**
     * @type {NPopoverGroupController}
     */
    declare scope : NPopoverGroupController;

    get classList() : string[]
    {
        return this.classRoot();
    }

}