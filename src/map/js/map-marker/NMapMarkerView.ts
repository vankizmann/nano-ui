import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NMapMarkerController } from "./NMapMarkerController.ts";

/**
 * @class NMapMarkerView
 * @extends {ProtoView<NMapMarkerController>}
 */
export class NMapMarkerView extends ProtoView
{
    /**
     * @type {NMapMarkerController}
     */
    declare scope : NMapMarkerController;

    default()
    {
        const { scope } = this;

        const props: any = {
            ref: scope.ref('el'),
            style: 'display: none;'
        };

        return h('div', props, [
            this.slot('default')
        ]);
    }

}

export default NMapMarkerView;