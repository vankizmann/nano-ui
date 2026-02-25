import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NPopoverOptionController } from "./NPopoverOptionController.js";

/**
 * @class NPopoverOptionView
 * @extends {BaseView<NPopoverOptionController>}
 */
export class NPopoverOptionView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-popover-option';

    default()
    {
        let { scope, data } = this.scope.unpack();

        let props = {
            class: data.classList
        };

        props.onClick = (e) => {
            scope.onClick(e);
        };

        props.onDblclick = (e) => {
            scope.onDblclick(e);
        };

        return h('div', props, [
            this.icon(data.icon), h('span', null, this.slot())
        ]);
    }

}

export default NPopoverOptionView;