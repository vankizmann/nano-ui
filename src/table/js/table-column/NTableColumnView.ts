import { ProtoView } from "../../../root/index.ts";
import { NTableColumnController } from "./NTableColumnController.ts";

export class NTableColumnView extends ProtoView
{
    /**
     * @type {NTableColumnController}
     */
    declare scope : NTableColumnController;

    /**
     * @type {string}
     */
    bem : string = 'n-table-column';

    default()
    {
        return null;
    }

}

export default NTableColumnView;