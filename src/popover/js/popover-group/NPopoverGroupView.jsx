import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NPopoverGroupController } from "./NPopoverGroupController.js";

/**
 * @class NPopoverGroupView
 * @extends {BaseView<NPopoverGroupController>}
 */
export class NPopoverGroupView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-popover-group';

    default()
    {
        let { data } = this.scope.unpack();

        let props = {
            class: data.classList
        };

        return h('div', props, [
            h('span', null, [this.slot()])
        ]);
    }

}

export default NPopoverGroupView;