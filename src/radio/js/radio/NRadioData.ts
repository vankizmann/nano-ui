import { Arr } from "@kizmann/pico-js";
import { ProtoData } from "../../../root/index.ts";
import NRadioController from "./NRadioController.ts";

export class NRadioData extends ProtoData
{
    /**
     * @type {NRadioController}
     */
    declare scope : NRadioController;

    get classList() : string[]
    {
        let classList = this.classRoot();

        if ( this.model === this.value ) {
            Arr.append(classList, 'n-checked');
        }

        return classList;
    }

    get model() : string
    {
        return this.scope.get('modelValue');
    }

    get value() : string
    {
        return this.scope.get('value');
    }

}