import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NPopoverGroupView } from "./NPopoverGroupView.ts";
import { NPopoverGroupData } from "./NPopoverGroupData.ts";

export class NPopoverGroupController extends ProtoController
{
    /**
     * @type {NPopoverGroupController}
     */
    declare scope : NPopoverGroupController;

    /**
     * @type {NPopoverGroupData}
     */
    declare data : NPopoverGroupData;

    /**
     * @type {NPopoverGroupView}
     */
    declare view : NPopoverGroupView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NPopoverGroupView(this),
            new NPopoverGroupData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.injectRef([
            'popover', 'NPopover'
        ]);

        return this;
    }

}

export default NPopoverGroupController;