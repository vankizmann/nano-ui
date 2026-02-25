import { ProtoController } from "../../../root/index.js";
import { NButtonProps } from "./NButton.js";
import { NButtonView } from "./NButtonView.jsx";
import { NButtonData } from "./NButtonData.js";

/**
 * @class NButtonController
 * @extends {BaseController<NButtonController, NButtonProps, NButtonView, NButtonData>}
 */
export class NButtonController extends ProtoController
{

    constructor(props, context)
    {
        super(props, context);

        [this.view, this.data] = [
            new NButtonView(this),
            new NButtonData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .linkProp('nativeType')
            .linkProp('load')
            .linkProp('type')
            .linkProp('size')
            .linkProp('disabled')
            .linkProp('icon')
            .linkProp('iconPosition')
            .linkProp('link')
            .linkProp('square')
            .linkProp('glass')
            .linkProp('round');

        return this;
    }

}

export default NButtonController;