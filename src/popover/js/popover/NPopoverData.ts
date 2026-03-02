import { ProtoData } from "../../../root/index.ts";
import NPopoverController from "./NPopoverController.ts";

export class NPopoverData extends ProtoData
{
    /**
     * @type {NPopoverController}
     */
    declare scope : NPopoverController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.position != null ) {
            classList.push(`:bem--${this.position}`);
        }

        return this.classRoot(classList);
    }

    get model() : boolean
    {
        return this.scope.get('modelValue');
    }

    get width() : number
    {
        return this.scope.get('width');
    }

    get target() : any
    {
        return this.scope.get('target');
    }

    get trigger() : string
    {
        return this.scope.get('trigger');
    }

    get toggle() : boolean
    {
        return this.scope.get('toggle');
    }

    get position() : string
    {
        return this.scope.get('position');
    }

    get escapeClose() : boolean
    {
        return this.scope.get('escapeClose');
    }

    get scrollClose() : boolean
    {
        return this.scope.get('scrollClose');
    }

    get multiClose() : boolean
    {
        return this.scope.get('multiClose');
    }

}