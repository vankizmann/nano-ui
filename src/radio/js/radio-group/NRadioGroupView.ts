import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NRadioGroupController } from "./NRadioGroupController.ts";

export class NRadioGroupView extends ProtoView
{
    /**
     * @type {NRadioGroupController}
     */
    declare scope : NRadioGroupController;

    /**
     * @type {string}
     */
    bem : string = 'n-radio-group';

    default() : any
    {
        let { data } = this.scope;

        let props = {
            class: data.classList
        };

        return h('div', props, [
            this.slot()
        ]);
    }

}

export default NRadioGroupView;