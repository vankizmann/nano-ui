import { ProtoData } from "../../../root/index.ts";
import NResizerController from "./NResizerController.ts";

export class NResizerData extends ProtoData
{
    /**
     * @type {NResizerController}
     */
    declare scope : NResizerController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.direction ) {
            classList.push(`:bem--${this.direction}`);
        }

        return this.classRoot(classList);
    }

    get model() : number
    {
        return this.scope.get('modelValue');
    }

    get width() : number
    {
        return this.scope.get('width');
    }

    get minWidth() : number
    {
        return this.scope.get('minWidth');
    }

    get maxWidth() : number
    {
        return this.scope.get('maxWidth');
    }

    get group() : any[]
    {
        return this.scope.get('group');
    }

    get flex() : string
    {
        return this.scope.get('flex');
    }

    get direction() : string
    {
        return this.scope.get('direction');
    }

}