import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NButtonGroupController } from "./NButtonGroupController.ts";

/**
 * @class NButtonGroupView
 * @extends {ProtoView<NButtonGroupController>}
 */
export class NButtonGroupView extends ProtoView
{
    /**
     * @type {NButtonGroupController}
     */
    declare scope : NButtonGroupController;

    /**
     * @type {string}
     */
    bem : string = 'n-button-group';

    default()
    {
        let { scope, data } = this.scope;

        let props = {
            class: data.classList,
        };

        return h('div', props, [
            this.slot('default')
        ]);
    }

}

export default NButtonGroupView;