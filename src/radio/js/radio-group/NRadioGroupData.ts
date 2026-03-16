import { ProtoData } from "../../../root/index.ts";
import NRadioGroupController from "./NRadioGroupController.ts";

export class NRadioGroupData extends ProtoData
{
    /**
     * @type {NRadioGroupController}
     */
    declare scope : NRadioGroupController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.align ) {
            classList.push(`:bem--${this.align}`);
        }

        return this.classRoot(classList);
    }

    get model() : string
    {
        return this.scope.get('modelValue');
    }

    get align() : string
    {
        return this.scope.get('align');
    }

}