import { ProtoController } from "../../../root/index.js";
import { NButtonGroupProps } from "./NButtonGroup.js";
import { NButtonGroupView } from "./NButtonGroupView.jsx";
import { NButtonGroupData } from "./NButtonGroupData.js";

/**
 * @class NButtonGroupController
 * @extends {BaseController<NButtonGroupController, NButtonGroupProps, NButtonGroupView, NButtonGroupData>}
 */
export class NButtonGroupController extends ProtoController
{

    constructor(props, context)
    {
        super(props, context);

        [this.view, this.data] = [
            new NButtonGroupView(this),
            new NButtonGroupData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .linkProp('load')
            .linkProp('type')
            .linkProp('size')
            .linkProp('disabled');

        return this;
    }

}

export default NButtonGroupController;