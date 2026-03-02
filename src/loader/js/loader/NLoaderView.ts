import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NLoaderController } from "./NLoaderController.ts";

export class NLoaderView extends ProtoView
{
    /**
     * @type {NLoaderController}
     */
    declare scope : NLoaderController;

    /**
     * @type {string}
     */
    bem : string = 'n-loader';

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

export default NLoaderView;