import { h } from "vue";
import { Arr, Mix } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NCollapseController } from "./NCollapseController.ts";

export class NCollapseView extends ProtoView
{
    /**
     * @type {NCollapseController}
     */
    declare scope : NCollapseController;

    /**
     * @type {string}
     */
    bem : string = 'n-collapse';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList,
        };

        return h('div', props, [
            this.items(), this.slot('default')
        ]);
    }

    items() : any
    {
        let { scope, data } = this.scope;

        const items = Arr.each(data.sorted, (item:any) => {
            return item.view.display(scope);
        });

        return Arr.filter(items);
    }

}

export default NCollapseView;