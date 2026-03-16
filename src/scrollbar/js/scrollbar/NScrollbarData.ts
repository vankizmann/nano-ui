import { ProtoData } from "../../../root/index.ts";
import NScrollbarController from "./NScrollbarController.ts";

export class NScrollbarData extends ProtoData
{
    /**
     * @type {NScrollbarController}
     */
    declare scope : NScrollbarController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.overflowX ) {
            classList.push('n-overflow-x');
        }

        if ( this.overflowY ) {
            classList.push('n-overflow-y');
        }

        return this.classRoot(classList);
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

    get wrapClass() : string
    {
        return this.scope.get('wrapClass');
    }

    set wrapClass(value : string)
    {
        this.scope.set('wrapClass', value);
    }

}