import { h } from "vue";
import { Arr } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NFormController } from "./NFormController.ts";

export class NFormView extends ProtoView
{
    /**
     * @type {NFormController}
     */
    declare scope : NFormController;

    /**
     * @type {string}
     */
    bem : string = 'n-form';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList,
        };

        return h(data.native, props, [
            this.slot('default')
        ]);
    }

}

export default NFormView;