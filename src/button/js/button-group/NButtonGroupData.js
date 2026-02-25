import { ProtoData } from "../../../root/index.js";

/**
 * @class NButtonGroupData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NButtonGroupData extends ProtoData
{

    get classList()
    {
        return this.classRoot();
    }

}