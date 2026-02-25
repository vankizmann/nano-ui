import { ProtoData } from "../../../root/index.js";

/**
 * @class NScrollbarData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NScrollbarData extends ProtoData
{

    get classList()
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

}