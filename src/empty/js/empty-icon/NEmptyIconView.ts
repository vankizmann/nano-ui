import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NEmptyIconController } from "./NEmptyIconController.ts";

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
        return this.div('text', [
            this.slot('default')
        ]);
    }

}

export default NEmptyIconView;