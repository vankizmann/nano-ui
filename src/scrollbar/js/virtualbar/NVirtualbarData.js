import { ProtoData } from "../../../root/index.js";

/**
 * @class NVirtualbarData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NVirtualbarData extends ProtoData
{

    get classList()
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

    get state()
    {
        return this.scope.get('state');
    }

    get items()
    {
        return this.scope.get('items');
    }

    get threshold()
    {
        return this.scope.get('threshold');
    }

    get rawMode()
    {
        return this.scope.get('rawMode');
    }

    get grid()
    {
        return this.scope.get('grid');
    }

    get itemWidth()
    {
        return this.scope.get('itemWidth');
    }

    get itemHeight()
    {
        return this.scope.get('itemHeight');
    }

    get overflowX()
    {
        return this.scope.get('overflowX');
    }

    get overflowY()
    {
        return this.scope.get('overflowY');
    }

    get wrapClass()
    {
        return this.scope.get('wrapClass');
    }

    get scrollPortal()
    {
        return this.scope.get('scrollPortal');
    }

}