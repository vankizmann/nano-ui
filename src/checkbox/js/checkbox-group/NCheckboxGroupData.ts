import { ProtoData } from "../../../root/index.ts";
import NCheckboxGroupController from "./NCheckboxGroupController.ts";

export class NCheckboxGroupData extends ProtoData
{
    /**
     * @type {NCheckboxGroupController}
     */
    declare scope : NCheckboxGroupController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.align ) {
            classList.push(`:bem--${this.align}`);
        }

        return this.classRoot(classList);
    }

    get model() : any[]
    {
        return this.scope.get('modelValue');
    }

    get checked() : boolean
    {
        return this.scope.get('checked');
    }

    get intermediate() : boolean
    {
        return this.scope.get('intermediate');
    }

    get align() : string
    {
        return this.scope.get('align');
    }

}