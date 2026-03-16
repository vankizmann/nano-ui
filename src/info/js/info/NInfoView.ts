import { h } from "vue";
import { Arr } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NInfoController } from "./NInfoController.ts";

export class NInfoView extends ProtoView
{
    /**
     * @type {NInfoController}
     */
    declare scope : NInfoController;

    /**
     * @type {string}
     */
    bem : string = 'n-info';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList,
        };

        const slots = [
            this.body()
        ];

        if ( ! data.scrollbar ) {
            return h('div', props, slots);
        }

        return this.comp('n-scrollbar', props, () => {
            return slots;
        });
    }

    body() : any
    {
        const { data } = this.scope;

        if ( data.item ) {
            return this.div('body', [this.slot()]);
        }

        return this.div('empty', [
            this.empty({ inline: false })
        ]);
    }

}

export default NInfoView;