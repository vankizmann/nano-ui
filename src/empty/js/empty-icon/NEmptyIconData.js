import { ProtoData } from "../../../root/index.js";

/**
 * @class NEmptyIconData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NEmptyIconData extends ProtoData
{

    get classList()
    {
        let classList = [
            `:bem--${this.image}`
        ];

        if ( this.scope.get('inline') ) {
            classList.push(':bem--inline');
        }

        return this.classRoot(classList);
    }

    get image() {
        return this.scope.get('image');
    }

}