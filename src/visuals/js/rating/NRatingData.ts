import { ProtoData } from "../../../root/index.ts";
import NRatingController from "./NRatingController.ts";
import { Mix } from "@kizmann/pico-js";

export class NRatingData extends ProtoData
{
    /**
     * @type {NRatingController}
     */
    declare scope : NRatingController;

    get classList() : string[]
    {
        return this.classRoot([]);
    }

    get model(): string|number
    {
        return this.scope.get('modelValue');
    }

    get value(): number
    {
        return Mix.num(this.model);
    }

    get closest(): number
    {
        return Math.round(this.value / this.stepSize) * this.stepSize;
    }

    get closestValue(): boolean
    {
        return this.scope.get('closestValue');
    }

    get stepSize(): number
    {
        return this.scope.get('stepSize');
    }

    get stars(): number
    {
        return this.scope.get('stars');
    }

    get decimals(): number
    {
        return this.scope.get('decimals');
    }

    get starsText(): string
    {
        return this.scope.get('starsText');
    }

}

export default NRatingData;