import { ProtoController } from "../../../root/index.js";
import { NTextareaProps } from "./NTextarea.js";
import { NTextareaData } from "./NTextareaData.js";
import { NTextareaView } from "./NTextareaView.jsx";

/**
 * @class NTextareaController
 * @extends {BaseController<NTextareaController, NTextareaProps, NTextareaView, NTextareaData>}
 */
export class NTextareaController extends ProtoController
{

    constructor(props, context)
    {
        super(props, context);

        [this.view, this.data] = [
            new NTextareaView(this),
            new NTextareaData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .cloneProp('modelValue')
            .linkProp('clearValue')
            .linkProp('load')
            .linkProp('type')
            .linkProp('size')
            .linkProp('disabled')
            .linkProp('autoRows')
            .linkProp('minRows')
            .linkProp('maxRows')
            .linkProp('maxLength')
            .linkProp('placeholder');

        this
            .makeData('focus')
            .makeRef('input');

        return this;
    }

}

export default NTextareaController;