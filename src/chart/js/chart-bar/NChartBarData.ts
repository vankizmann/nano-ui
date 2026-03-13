import { ProtoData } from "../../../root/index.ts";
import NChartBarController from "./NChartBarController.ts";

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

    get minval() : number
    {
        return this.scope.get('minval');
    }

    get maxval() : number
    {
        return this.scope.get('maxval');
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