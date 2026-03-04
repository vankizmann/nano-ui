import { ProtoData } from "../../../root/index.ts";
import NCollapseController from "./NCollapseController.ts";
import NCollapseItemController from "../collapse-item/NCollapseItemController.ts";

export class NCollapseData extends ProtoData
{
    /**
     * @type {NCollapseController}
     */
    declare scope : NCollapseController;

    get classList() : string[]
    {
        return this.classRoot([]);
    }

    get model() : string
    {
        return this.scope.get('modelValue');
    }

    get sorted() : NCollapseItemController[]
    {
        return this.scope.get('sorted');
    }

    get values() : string
    {
        return this.scope.get('values');
    }

    get scrollbar() : boolean
    {
        return this.scope.get('scrollbar');
    }

    get lazy() : boolean
    {
        return this.scope.get('lazy');
    }

    get keep() : boolean
    {
        return this.scope.get('keep');
    }

    get dragOpen() : boolean
    {
        return this.scope.get('dragOpen');
    }

}

export default NCollapseData;