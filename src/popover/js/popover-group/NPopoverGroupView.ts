import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NPopoverGroupController } from "./NPopoverGroupController.ts";

export class NPopoverGroupView extends ProtoView
{
    /**
     * @type {NPopoverGroupController}
     */
    declare scope : NPopoverGroupController;

    /**
     * @type {string}
     */
    bem : string = 'n-popover-group';

    default() : any
    {
        let { data } = this.scope;

        let props = {
            class: data.classList
        };

        return h('div', props, [
            h('span', null, [this.slot()])
        ]);
    }

}

export default NPopoverGroupView;