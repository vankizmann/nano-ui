import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NChartItemController } from "./NChartItemController.ts";

/**
 * @class NChartItemView
 * @extends {ProtoView<NChartItemController>}
 */
export class NChartItemView extends ProtoView
{
    /**
     * @type {NChartItemController}
     */
    declare scope : NChartItemController;

    default()
    {
        return null;
    }

}

export default NChartItemView;