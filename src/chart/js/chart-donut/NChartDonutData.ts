import { ProtoData } from "../../../root/index.ts";
import NChartDonutController from "./NChartDonutController.ts";
import NChartItemController from "../chart-item/NChartItemController.ts";

export class NChartDonutData extends ProtoData
{
    /**
     * @type {NChartDonutController}
     */
    declare scope : NChartDonutController;

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

    get total() : number
    {
        return this.scope.get('total');
    }

    get maxval() : number
    {
        return this.scope.get('maxval');
    }

    get avgval() : number
    {
        return this.scope.get('avgval');
    }

    get length() : number
    {
        return this.hidden.length ? this.visible.length + 1 : this.visible.length;
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

    get width() : number
    {
        return this.scope.get('width');
    }

    get overlap() : boolean
    {
        return this.scope.get('overlap');
    }

}

export default NChartDonutData;