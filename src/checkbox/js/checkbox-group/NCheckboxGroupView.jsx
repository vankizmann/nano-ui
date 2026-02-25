import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NCheckboxGroupController } from "./NCheckboxGroupController.js";

/**
 * @class NCheckboxGroupView
 * @extends {BaseView<NCheckboxGroupController>}
 */
export class NCheckboxGroupView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-checkbox-group';

    default()
    {
        let { data } = this.scope.unpack();

        let props = {
            class: data.classList
        };

        return h('div', props, [
            this.slot('default')
        ]);
    }

}

export default NCheckboxGroupView;