import { ProtoData } from "../../../root/index.ts";
import NPopoverOptionController from "./NPopoverOptionController.ts";

export class NPopoverOptionData extends ProtoData
{
    /**
     * @type {NPopoverOptionController}
     */
    declare scope : NPopoverOptionController;

    get classList() : string[]
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

    get focus() : boolean
    {
        return this.scope.get('focus');
    }

    get active() : boolean
    {
        return this.scope.get('active');
    }

    get clickClose() : boolean
    {
        return this.scope.get('clickClose');
    }

}