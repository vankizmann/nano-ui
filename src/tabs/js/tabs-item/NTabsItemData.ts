import { ProtoData } from "../../../root/index.ts";
import NTabsItemController from "./NTabsItemController.ts";

export class NTabsItemData extends ProtoData
{
    /**
     * @type {NTabsItemController}
     */
    declare scope : NTabsItemController;

    get classList() : string[]
    {
        let classList = [];


        return this.classRoot(classList);
    }

    get init(): boolean
    {
        return this.scope.get('init');
    }

    get name(): string
    {
        return this.scope.get('name');
    }

    get label(): string
    {
        return this.scope.get('label');
    }

    get sort(): number
    {
        return this.scope.get('sort');
    }

    get lazy(): boolean
    {
        return this.scope.get('lazy');
    }

    get keep(): boolean
    {
        return this.scope.get('keep');
    }

    get scrollbar(): boolean
    {
        return this.scope.get('scrollbar');
    }

}

export default NTabsItemData;