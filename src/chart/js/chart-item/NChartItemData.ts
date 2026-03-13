import { ProtoData } from "../../../root/index.ts";
import NChartItemController from "./NChartItemController.ts";

export class NChartItemData extends ProtoData
{
    /**
     * @type {NChartItemController}
     */
    declare scope : NChartItemController;

    get value() : string|number
    {
        return this.scope.get('value');
    }

    get axis() : string
    {
        return this.scope.get('axis');
    }

    get label() : string
    {
        return this.scope.get('label');
    }

}