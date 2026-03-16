import { h } from "vue";
import { Arr } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NDropzoneController } from "./NDropzoneController.ts";

export class NDropzoneView extends ProtoView
{
    /**
     * @type {NDropzoneController}
     */
    declare scope : NDropzoneController;

    /**
     * @type {string}
     */
    bem : string = 'n-dropzone';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList,
            dropzone: scope.uid,
        };

        return h('div', props, [this.body()]);
    }

    body() : any
    {
        let { data, context } = this.scope;

        if ( data.item == null ) {
            return null;
        }

        return context.slots.default(data.item);
    }

}

export default NDropzoneView;