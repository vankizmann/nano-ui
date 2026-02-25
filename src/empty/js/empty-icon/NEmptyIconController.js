import { ProtoController } from "../../../root/index.js";
import { NEmptyIconProps } from "./NEmptyIcon.js";
import { NEmptyIconView } from "./NEmptyIconView.jsx";
import { NEmptyIconData } from "./NEmptyIconData.js";

/**
 * @class NEmptyIconController
 * @extends {BaseController<NEmptyIconController, NEmptyIconProps, NEmptyIconView, NEmptyIconData>}
 */
export class NEmptyIconController extends ProtoController
{

    constructor(props, context)
    {
        super(props, context);

        [this.view, this.data] = [
            new NEmptyIconView(this),
            new NEmptyIconData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .linkProp('size')
            .linkProp('image')
            .linkProp('inline');

        return this;
    }

}

export default NEmptyIconController;