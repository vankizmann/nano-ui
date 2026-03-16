import { ProtoData } from "../../../root/index.ts";
import NInputNumberController from "./NInputNumberController.ts";

export class NInputNumberData extends ProtoData
{
    /**
     * @type {NInputNumberController}
     */
    declare scope : NInputNumberController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.scope.get('focus') ) {
            classList.push('n-focus');
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

    get focus() : number
    {
        return this.scope.get('focus');
    }

    set focus(value : number)
    {
        this.scope.set('focus', value);
    }

    get placeholder() : string
    {
        return this.scope.get('placeholder');
    }

    set placeholder(value : string)
    {
        this.scope.set('placeholder', value);
    }


    get min() : number
    {
        return this.scope.get('min');
    }

    set min(value : number)
    {
        this.scope.set('min', value);
    }

    get max() : number
    {
        return this.scope.get('max');
    }

    set max(value : number)
    {
        this.scope.set('max', value);
    }

    get stepSize() : number
    {
        return this.scope.get('stepSize');
    }

    set stepSize(value : number)
    {
        this.scope.set('stepSize', value);
    }

    get precision() : number
    {
        return this.scope.get('precision');
    }

    set precision(value : number)
    {
        this.scope.set('precision', value);
    }

    get format() : string
    {
        return this.scope.get('format');
    }

    set format(value : string)
    {
        this.scope.set('format', value);
    }

}

export default NInputNumberData;