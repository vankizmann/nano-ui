import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NCheckboxGroupController } from "./NCheckboxGroupController.ts";

export class NCheckboxGroupView extends ProtoView
{
    /**
     * @type {NCheckboxGroupController}
     */
    declare scope : NCheckboxGroupController;

    /**
     * @type {string}
     */
    bem : string = 'n-checkbox-group';

    default() : any
    {
        let { data } = this.scope;

        let props = {
            class: data.classList
        };

        return h('div', props, [
            this.slot('default')
        ]);
    }

}

export default NCheckboxGroupView;