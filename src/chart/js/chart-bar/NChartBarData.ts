import { ProtoData } from "../../../root/index.ts";
import NChartBarController from "./NChartBarController.ts";
import NChartItemController from "../chart-item/NChartItemController.ts";

export class NChartBarData extends ProtoData
{
    /**
     * @type {NChartBarController}
     */
    declare scope : NChartBarController;

    get classList() : string[]
    {
        return this.classRoot([]);
    }

    get visible() : NChartItemController[]
    {
        return this.scope.get('visible');
    }

    get hidden() : NChartItemController[]
    {
        return this.scope.get('hidden');
    }

    get maxval() : number
    {
        return this.scope.get('maxval');
    }

    get avgval() : number
    {
        return this.scope.get('avgval');
    }

    get sort() : boolean
    {
        return this.scope.get('sort');
    }

    get limit() : number
    {
        return this.scope.get('limit');
    }

    get legend() : boolean
    {
        return this.scope.get('legend');
    }

    get color() : string|number
    {
        return this.scope.get('color');
    }

    get totalLabel() : string
    {
        return this.scope.get('totalLabel');
    }

    get otherLabel() : string
    {
        return this.scope.get('otherLabel');
    }

    get minHeight() : number
    {
        return this.scope.get('minHeight');
    }

}

export default NChartBarData;