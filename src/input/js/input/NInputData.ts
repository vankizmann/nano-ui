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

    get native() : string
    {
        return this.scope.get('nativeType');
    }

    get placeholder() : string
    {
        return this.scope.get('placeholder');
    }

    get focus() : number
    {
        return this.scope.get('focus');
    }

    get label() : string
    {
        return this.scope.get('label');
    }

    get labelPosition() : string
    {
        return this.scope.get('labelPosition');
    }

}

export default NInputData;