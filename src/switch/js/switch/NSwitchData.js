import { ProtoData } from "../../../root/index.js";

/**
 * @class NSwitchData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NSwitchData extends ProtoData
{

    get classList()
    {
        let classList = [];

        if ( this.model === this.onValue ) {
            classList.push('n-on');
        }

        if ( this.model === this.offValue ) {
            classList.push('n-off');
        }

        if ( this.onType && this.onValue === this.model ) {
            classList.push(`n-type-${this.onType}`);
        }

        if ( this.offType && this.offValue === this.model ) {
            classList.push(`n-type-${this.offType}`);
        }

        return this.classRoot(classList);
    }

    get model()
    {
        return this.scope.get('modelValue');
    }

    get onValue() {
        return this.scope.get('onValue');
    }

    get offValue() {
        return this.scope.get('offValue');
    }

    get onType() {
        return this.scope.get('onType');
    }

    get offType() {
        return this.scope.get('offType');
    }

}