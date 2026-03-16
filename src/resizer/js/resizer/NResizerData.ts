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

    set model(value : number)
    {
        this.scope.set('modelValue', value);
    }

    get width() : number
    {
        return this.scope.get('width');
    }

    set width(value : number)
    {
        this.scope.set('width', value);
    }

    get minWidth() : number
    {
        return this.scope.get('minWidth');
    }

    set minWidth(value : number)
    {
        this.scope.set('minWidth', value);
    }

    get maxWidth() : number
    {
        return this.scope.get('maxWidth');
    }

    set maxWidth(value : number)
    {
        this.scope.set('maxWidth', value);
    }

    get group() : any[]
    {
        return this.scope.get('group');
    }

    set group(value : any[])
    {
        this.scope.set('group', value);
    }

    get flex() : string
    {
        return this.scope.get('flex');
    }

    set flex(value : string)
    {
        this.scope.set('flex', value);
    }

    get direction() : string
    {
        return this.scope.get('direction');
    }

    set direction(value : string)
    {
        this.scope.set('direction', value);
    }

}