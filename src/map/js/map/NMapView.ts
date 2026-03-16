import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NMapController } from "./NMapController.ts";

export class NMapView extends ProtoView
{
    /**
     * @type {NMapController}
     */
    declare scope : NMapController;

    /**
     * @type {string}
     */
    bem : string = 'n-map';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            ref: scope.ref('el'),
            class: data.classList,
        };

        return h('div', props, [
            this.slot('default')
        ]);
    }

}

export default NMapView;