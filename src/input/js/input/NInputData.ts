import { ProtoData } from "../../../root/index.ts";
import { NInputController } from "./NInputController.ts";

export class NInputData extends ProtoData
{
    declare scope : NInputController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.scope.get('focus') ) {
            classList.push('n-focus');
        }

        return this.classRoot(classList);
    }

    get model() : any
    {
        return this.scope.get('modelValue');
    }

    set model(value : any)
    {
        this.scope.set('modelValue', value);
    }

    get native() : string
    {
        return this.scope.get('nativeType');
    }

    set native(value : string)
    {
        this.scope.set('nativeType', value);
    }

    get placeholder() : string
    {
        return this.scope.get('placeholder');
    }

    set placeholder(value : string)
    {
        this.scope.set('placeholder', value);
    }

    get focus() : number
    {
        return this.scope.get('focus');
    }

    set focus(value : number)
    {
        this.scope.set('focus', value);
    }

}

export default NInputData;