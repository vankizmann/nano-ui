import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NRadioGroupController } from "./NRadioGroupController.js";

/**
 * @class NRadioGroupView
 * @extends {BaseView<NRadioGroupController>}
 */
export class NRadioGroupView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-radio-group';

    default()
    {
        let { data } = this.scope.unpack();

        let props = {
            class: data.classList
        };

        return h('div', props, [
            this.slot()
        ]);
    }

}

export default NRadioGroupView;