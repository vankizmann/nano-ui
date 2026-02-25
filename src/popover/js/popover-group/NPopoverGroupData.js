import { ProtoData } from "../../../root/index.js";

/**
 * @class NPopoverGroupData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NPopoverGroupData extends ProtoData
{

    get classList()
    {
        return this.classRoot();
    }

}