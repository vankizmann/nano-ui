import { ProtoController } from "../../../root/index.ts";
import { SetupContext } from "vue";
import NInputData from "./NInputData.ts";
import NInputView from "./NInputView.ts";

export class NInputController extends ProtoController
{
    /**
     * @type {NInputController}
     */
    declare scope : NInputController;

    /**
     * @type {NInputData}
     */
    declare data: NInputData;

    /**
     * @type {NInputView}
     */
    declare view: NInputView;

    constructor(props: any, context: SetupContext)
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