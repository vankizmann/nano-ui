import { ProtoData } from "../../../root/index.ts";
import NSliderController from "./NSliderController.ts";
import { Arr, Mix } from "@kizmann/pico-js";

export class NSliderData extends ProtoData
{
    /**
     * @type {NSliderController}
     */
    declare scope : NSliderController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.range ) {
            classList.push('n-range');
        }

        return this.classRoot(classList);
    }

    get model() : any
    {
        return this.scope.get('modelValue');
    }

    get values() : number[]
    {
        return this.scope.get('values');
    }

    get index() : number
    {
        return this.scope.get('index');
    }

    get width() : number
    {
        return this.scope.get('width');
    }

    get range() : boolean
    {
        return this.scope.get('range');
    }

    get steps() : any
    {
        return this.scope.get('steps');
    }

    get labels() : any
    {
        return this.scope.get('labels');
    }

    get min() : number
    {
        return this.scope.get('min');
    }

    get minfix() : number
    {
        return Mix.isArr(this.steps) ? Arr.first(this.steps) : this.min;
    }

    get max() : number
    {
        return this.scope.get('max');
    }

    get maxfix() : number
    {
        return Mix.isArr(this.steps) ? Arr.last(this.steps) : this.max;
    }

    get minmax() : number
    {
        return this.maxfix - this.minfix;
    }


}

export default NSliderData;