import { ProtoExtend, ProtoData, DragData } from "../../../root/index.ts";
import NTableController from "./NTableController.ts";


export class NTableData extends ProtoExtend([ProtoData, DragData])
{
    /**
     * @type {NTableController}
     */
        // @ts-ignore
    declare scope : NTableController;

    get classList() : string[]
    {
        let classList = [];

        return this.classRoot(classList);
    }

    get visible() : string[]
    {
        return this.scope.get('visible');
    }

    set visible(value : string[])
    {
        this.scope.set('visible', value);
    }

    get filter() : any[]
    {
        return this.scope.get('filter');
    }

    set filter(value : any[])
    {
        this.scope.set('filter', value);
    }

    get filterMap() : any[]
    {
        return this.scope.get('filterMap');
    }

    set filterMap(value : any[])
    {
        this.scope.set('filterMap', value);
    }

    get looseWidth() : any
    {
        return this.scope.get('looseWidth');
    }

    set looseWidth(value : any)
    {
        this.scope.set('looseWidth', value);
    }

    get fixedWidth() : any
    {
        return this.scope.get('fixedWidth');
    }

    set fixedWidth(value : any)
    {
        this.scope.set('fixedWidth', value);
    }

    get sortProp() : string
    {
        return this.scope.get('sortProp');
    }

    set sortProp(value : string)
    {
        this.scope.set('sortProp', value);
    }

    get sortDir() : string
    {
        return this.scope.get('sortDir');
    }

    set sortDir(value : string)
    {
        this.scope.set('sortDir', value);
    }

}

export interface NTableData extends ProtoData, DragData {}

export default NTableData;