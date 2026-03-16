import { ProtoData } from "../../../root/index.ts";
import NPopoverPanelController from "./NPopoverPanelController.ts";

export class NPopoverPanelData extends ProtoData
{
    /**
     * @type {NPopoverPanelController}
     */
    declare scope : NPopoverPanelController;

    get classList():string[]
    {
        let classList = [];

        if ( this.focus ) {
            classList.push('n-focus');
        }

        return this.classRoot(classList);
    }

    get focus()
    {
        return this.scope.get('focus');
    }

}

export default NPopoverPanelData;