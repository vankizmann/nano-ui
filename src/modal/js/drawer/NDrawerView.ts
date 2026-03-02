import { NDrawerController } from "./NDrawerController.ts";
import { NModalView } from "../modal/NModalView.ts";

export class NDrawerView extends NModalView
{
    /**
     * @type {NDrawerController}
     */
    declare scope : NDrawerController;

    /**
     * @type {string}
     */
    bem : string = 'n-drawer';

}

export default NDrawerView;