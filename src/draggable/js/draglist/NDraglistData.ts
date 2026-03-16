import { ProtoExtend, ProtoData, DragData } from "../../../root/index.ts";
import NDraglistController from "./NDraglistController.ts";

export class NDraglistData extends ProtoExtend([ProtoData, DragData])
{
    /**
     * @type {NDraglistController}
     */
    declare scope : NDraglistController;

    get classList() : string[]
    {
        let classList = [];

        return this.classRoot(classList);
    }

    get index() : number
    {
        return this.scope.get('index');
    }

    set index(value : number)
    {
        this.scope.set('index', value);
    }

    get virtuals() : any[]
    {
        return this.scope.get('virtuals');
    }

    set virtuals(value : any[])
    {
        this.scope.set('virtuals', value);
    }

    get visibles() : any[]
    {
        return this.scope.get('visibles');
    }

    set visibles(value : any[])
    {
        this.scope.set('visibles', value);
    }

    get relation() : any
    {
        return this.scope.get('relation');
    }

    set relation(value : any)
    {
        this.scope.set('relation', value);
    }

    get grid() : boolean
    {
        return this.scope.get('grid');
    }

    get itemHeight() : number
    {
        return this.scope.get('itemHeight');
    }

    get itemWidth() : number
    {
        return this.scope.get('itemWidth');
    }

    get itemOffset() : number
    {
        return this.scope.get('itemOffset');
    }

    get scrollPortal() : boolean
    {
        return this.scope.get('scrollPortal');
    }

    set scrollPortal(value : boolean)
    {
        this.scope.set('scrollPortal', value);
    }

}

export interface NDraglistData extends ProtoData, DragData
{
}

export default NDraglistData;