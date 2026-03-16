import { ProtoData } from "../../../root/index.ts";
import NVirtualbarController from "./NVirtualbarController.ts";

export class NVirtualbarData extends ProtoData
{
    /**
     * @type {NVirtualbarController}
     */
    declare scope : NVirtualbarController;

    get classList() : string[]
    {
        let classList = [
            'n-virtual'
        ];

        if ( this.overflowX ) {
            classList.push('n-overflow-x');
        }

        if ( this.overflowY ) {
            classList.push('n-overflow-y');
        }

        return this.classRoot(classList);
    }

    get state() : any
    {
        return this.scope.get('state');
    }

    set state(value : any)
    {
        this.scope.set('state', value);
    }

    get items() : any[]
    {
        return this.scope.get('items');
    }

    set items(value : any[])
    {
        this.scope.set('items', value);
    }

    get threshold() : number
    {
        return this.scope.get('threshold');
    }

    set threshold(value : number)
    {
        this.scope.set('threshold', value);
    }

    get rawMode() : boolean
    {
        return this.scope.get('rawMode');
    }

    set rawMode(value : boolean)
    {
        this.scope.set('rawMode', value);
    }

    get wrapClass() : string
    {
        return this.scope.get('wrapClass');
    }

    set wrapClass(value : string)
    {
        this.scope.set('wrapClass', value);
    }

    get grid() : number
    {
        return this.scope.get('grid');
    }

    set grid(value : number)
    {
        this.scope.set('grid', value);
    }

    get itemWidth() : number
    {
        return this.scope.get('itemWidth');
    }

    set itemWidth(value : number)
    {
        this.scope.set('itemWidth', value);
    }

    get itemHeight() : number
    {
        return this.scope.get('itemHeight');
    }

    set itemHeight(value : number)
    {
        this.scope.set('itemHeight', value);
    }

    get overflowX() : boolean
    {
        return this.scope.get('overflowX');
    }

    set overflowX(value : boolean)
    {
        this.scope.set('overflowX', value);
    }

    get overflowY() : boolean
    {
        return this.scope.get('overflowY');
    }

    set overflowY(value : boolean)
    {
        this.scope.set('overflowY', value);
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