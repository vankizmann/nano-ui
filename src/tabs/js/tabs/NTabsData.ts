import { ProtoData } from "../../../root/index.ts";
import NTabsController from "./NTabsController.ts";
import NTabsItemController from "../tabs-item/NTabsItemController.ts";

export class NTabsData extends ProtoData
{
    /**
     * @type {NTabsController}
     */
    declare scope : NTabsController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.float ) {
            classList.push('n-float');
        }

        return this.classRoot(classList);
    }

    get model() : string
    {
        return this.scope.get('modelValue');
    }

    get sorted() : NTabsItemController[]
    {
        return this.scope.get('sorted');
    }

    get value() : string
    {
        return this.scope.get('value');
    }

    get float(): boolean
    {
        return this.scope.get('float');
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

export default NTabsData;