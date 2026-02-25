import { ProtoData } from "../../../root/index.js";

/**
 * @class NButtonData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NButtonData extends ProtoData
{

    get classList()
    {
        let classList = [];

        if ( this.scope.get('link') ) {
            classList.push(':bem--link');
        }

        if ( this.scope.get('square') ) {
            classList.push(':bem--square');
        }

        if ( this.scope.get('round') ) {
            classList.push(':bem--round');
        }

        if ( this.scope.get('glass') ) {
            classList.push(':bem--glass');
        }

        return this.classRoot(classList);
    }

    get disabled() {
        return this.scope.get('disabled');
    }

    get type() {
        return this.scope.get('nativeType');
    }

    get icon() {
        return this.scope.get('icon');
    }

    get iconPosition() {
        return this.scope.get('iconPosition');
    }

}