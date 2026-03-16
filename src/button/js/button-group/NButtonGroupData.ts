import { ProtoData } from "../../../root/index.ts";
import NButtonGroupController from "./NButtonGroupController.ts";

export class NButtonGroupData extends ProtoData
{
    /**
     * @type {NButtonGroupController}
     */
    declare scope : NButtonGroupController;

    get classList(): string[]
    {
        return this.classRoot();
    }

}