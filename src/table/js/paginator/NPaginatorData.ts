import { ProtoData } from "../../../root/index.ts";
import NPaginatorController from "./NPaginatorController.ts";

export class NPaginatorData extends ProtoData
{
    /**
     * @type {NPaginatorController}
     */
    declare scope : NPaginatorController;

    get classList() : string[]
    {
        return this.classRoot([]);
    }

    get page() : number
    {
        return this.scope.get('page');
    }

    get pageOptions() : number[]
    {
        return this.scope.get('pageOptions');
    }

    get limit() : number
    {
        return this.scope.get('limit');
    }

    get limitOptions() : number[]
    {
        return this.scope.get('limitOptions');
    }

    get total() : number
    {
        return this.scope.get('total');
    }

    get maxPages() : number
    {
        return this.scope.get('maxPages');
    }

    get layout() : string[]
    {
        return this.scope.get('layout');
    }

    get limitText() : string
    {
        return this.scope.get('limitText');
    }

    get countText() : string
    {
        return this.scope.get('countText');
    }

    get buttonProps() : any
    {
        return this.scope.get('buttonProps');
    }

}

export default NPaginatorData;