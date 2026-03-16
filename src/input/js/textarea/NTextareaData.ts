import { ProtoData } from "../../../root/index.ts";
import NTextareaController from "./NTextareaController.ts";

export class NTextareaData extends ProtoData
{
    /**
     * @type {NTextareaController}
     */
    declare scope : NTextareaController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.scope.get('focus') ) {
            classList.push('n-focus');
        }

        return this.classRoot(classList);
    }

    get model() : string
    {
        return this.scope.get('modelValue');
    }

    set model(value : string)
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

    get placeholder()
    {
        return this.scope.get('placeholder');
    }

    set placeholder(value : string)
    {
        this.scope.set('placeholder', value);
    }

    get autoRows() : boolean
    {
        return this.scope.get('autoRows');
    }

    set autoRows(value : boolean)
    {
        this.scope.set('autoRows', value);
    }

    get maxRows() : number
    {
        return this.scope.get('maxRows');
    }

    set maxRows(value : number)
    {
        this.scope.set('maxRows', value);
    }

    get minRows() : number
    {
        return this.scope.get('minRows');
    }

    set minRows(value : number)
    {
        this.scope.set('minRows', value);
    }

    get maxLength() : number
    {
        return this.scope.get('maxLength');
    }

    set maxLength(value : number)
    {
        this.scope.set('maxLength', value);
    }

}

export default NTextareaData;