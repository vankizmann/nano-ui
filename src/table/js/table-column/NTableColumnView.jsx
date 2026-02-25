import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NTableColumnController } from "./NTableColumnController.js";

/**
 * @class NTableColumnView
 * @extends {BaseView<NTableColumnController>}
 */
export class NTableColumnView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-table-column';

    default()
    {
        return null
    }

}

export default NTableColumnView;