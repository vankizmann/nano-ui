import { ProtoData } from "../../../root/index.ts";
import NFormItemController from "./NFormItemController.ts";

export class NFormItemData extends ProtoData
{
    /**
     * @type {NFormItemController}
     */
    declare scope : NFormItemController;

    get classList(): string[]
    {
        return this.classRoot();
    }

    get model() : boolean
    {
        return this.scope.get('modelValue');
    }

    get rules() : boolean
    {
        return this.scope.get('rules');
    }

    get label() : string
    {
        return this.scope.get('label');
    }

    get prop() : string
    {
        return this.scope.get('prop');
    }

    get conditional() : boolean
    {
        return this.scope.get('conditional');
    }

}