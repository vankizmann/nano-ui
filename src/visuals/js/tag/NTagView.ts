import { h } from "vue";
import { Arr } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NTagController } from "./NTagController.ts";

export class NTagView extends ProtoView
{
    /**
     * @type {NTagController}
     */
    declare scope : NTagController;

    /**
     * @type {string}
     */
    bem : string = 'n-tag';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList,
        };

        const slots = [
            h('span', null, [this.slot('default')])
        ];

        if ( data.iconPosition === 'before' ) {
            Arr.prepend(slots, this.icon(data.icon));
        }

        if ( data.iconPosition === 'after' ) {
            Arr.append(slots, this.icon(data.icon));
        }

        return h('div', props, slots);
    }

}

export default NTagView;