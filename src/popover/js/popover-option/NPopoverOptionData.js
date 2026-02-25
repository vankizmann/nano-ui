import { ProtoData } from "../../../root/index.js";

/**
 * @class NPopoverOptionData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NPopoverOptionData extends ProtoData
{

    get classList()
    {
        let classList = [];

        if ( this.active ) {
            classList.push('n-active');
        }

        if ( this.focus ) {
            classList.push('n-focus');
        }

        return this.classRoot(classList);
    }

    get icon() {
        return this.scope.get('icon');
    }

    get focus() {
        return this.scope.get('focus');
    }

    get active() {
        return this.scope.get('active');
    }

    get clickClose() {
        return this.scope.get('clickClose');
    }

}