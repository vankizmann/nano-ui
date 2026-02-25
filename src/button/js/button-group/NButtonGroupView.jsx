import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NButtonGroupController } from "./NButtonGroupController.js";
import { Arr } from "@kizmann/pico-js";

/**
 * @class NButtonGroupView
 * @extends {BaseView<NButtonGroupController>}
 */
export class NButtonGroupView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-button-group';

    default()
    {
        let { scope, data } = this.scope.unpack();

        let props = {
            class: data.classList,
        };

        return h('div', props, [
            this.slot('default')
        ]);
    }

}

export default NButtonGroupView;