import { ProtoData } from "../../../root/index.ts";
import { Arr } from "@kizmann/pico-js";
import NCheckboxController from "./NCheckboxController.ts";

export class NCheckboxData extends ProtoData
{
    /**
     * @type {NCheckboxController}
     */
    declare scope : NCheckboxController;

    get classList() : string[]
    {
        let classList = this.classRoot([
            `${this.scope.view.bem}--${this.view}`
        ]);

        if ( this.model ) {
            Arr.append(classList, 'n-checked');
        }

        if ( this.model && this.allowUncheck ) {
            Arr.remove(classList, 'n-disabled');
        }

        if ( this.intermediate ) {
            Arr.append(classList, 'n-intermediate');
        }

        return classList;
    }

    get model() : boolean
    {
        return this.scope.get('modelValue');
    }

    get value() : any
    {
        return this.scope.get('value');
    }

    get allowUncheck() : boolean
    {
        return this.scope.get('allowUncheck');
    }

    get global() : boolean
    {
        return this.scope.get('global');
    }

    get intermediate() : boolean
    {
        return this.scope.get('intermediate');
    }

    get view() : string
    {
        return this.scope.ncx('group')?.data.view || this.scope.get('view');
    }

}