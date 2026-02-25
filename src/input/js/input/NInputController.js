import { ProtoController } from "../../../root/index.js";
import { NInputProps } from "./NInput.js";
import { NInputData } from "./NInputData.js";
import { NInputView } from "./NInputView.jsx";

/**
 * @class NInputController
 * @extends {BaseController<NInputController, NInputProps, NInputView, NInputData>}
 */
export class NInputController extends ProtoController
{

    constructor(props, context)
    {
        super(props, context);

        [this.view, this.data] = [
            new NInputView(this),
            new NInputData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .cloneProp('modelValue')
            .linkProp('clearValue');

        this
            .makeData('focus')
            .makeRef('input');

        return this;
    }

}

export default NInputController;