import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NEmptyIconController } from "./NEmptyIconController.ts";
import { Locale, Mix } from "@kizmann/pico-js";

export class NEmptyIconView extends ProtoView
{
    /**
     * @type {NEmptyIconController}
     */
    declare scope : NEmptyIconController;

    /**
     * @type {string}
     */
    bem : string = 'n-empty-icon';

    default() : any
    {
        let { data } = this.scope;

        let props = {
            class: data.classList
        };

        return h('div', props, [
            this.type(), this.body()
        ]);
    }

    type() : any
    {
        return this.div('type', [
            this.slot('icon')
        ]);
    }

    body() : any
    {
        const {context, data} = this.scope;

        let slot = null;

        if ( context.slots.default ) {
            slot = this.slot('default');
        }

        if ( ! Mix.isEmpty(data.emptyText) ) {
            slot = Locale.trans(data.emptyText);
        }

        return !slot ? null : this.div('text', [
            slot
        ]);
    }

}

export default NEmptyIconView;