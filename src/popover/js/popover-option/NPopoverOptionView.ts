import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NPopoverOptionController } from "./NPopoverOptionController.ts";

export class NPopoverOptionView extends ProtoView
{
    /**
     * @type {NPopoverOptionController}
     */
    declare scope : NPopoverOptionController;

    /**
     * @type {string}
     */
    bem : string = 'n-popover-option';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList
        };

        props.onClick = (e : any) => {
            scope.onClick(e);
        };

        props.onDblclick = (e : any) => {
            scope.onDblclick(e);
        };

        return h('div', props, [
            this.icon(data.icon), h('span', null, this.slot())
        ]);
    }

}

export default NPopoverOptionView;