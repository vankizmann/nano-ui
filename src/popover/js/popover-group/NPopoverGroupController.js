import { ProtoController } from "../../../root/index.js";
import { NPopoverGroupProps } from "./NPopoverGroup.js";
import { NPopoverGroupView } from "./NPopoverGroupView.jsx";
import { NPopoverGroupData } from "./NPopoverGroupData.js";

/**
 * @class NPopoverGroupController
 * @extends {BaseController<NPopoverGroupController, NPopoverGroupProps, NPopoverGroupView, NPopoverGroupData>}
 */
export class NPopoverGroupController extends ProtoController
{

    constructor(props, context)
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