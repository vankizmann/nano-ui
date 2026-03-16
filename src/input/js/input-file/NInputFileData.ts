import { ProtoData } from "../../../root/index.ts";
import { NInputFileController } from "./NInputFileController.ts";

export class NInputFileData extends ProtoData
{
    declare scope : NInputFileController;

    get classList() : string[]
    {
        return this.classRoot([]);
    }

    get model() : any
    {
        return this.scope.get('modelValue');
    }

    set model(value : any)
    {
        this.scope.set('modelValue', value);
    }

    get multiple() : boolean
    {
        return this.scope.get('multiple');
    }

    get glass() : boolean
    {
        return this.scope.get('glass');
    }

    get placeholder() : string
    {
        return this.scope.get('placeholder');
    }

    get buttonText() : string
    {
        return this.scope.get('buttonText');
    }

    get countText() : string
    {
        return this.scope.get('countText');
    }

}

export default NInputFileData;