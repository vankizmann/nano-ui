import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NTextareaData } from "./NTextareaData.ts";
import { NTextareaView } from "./NTextareaView.ts";

export class NTextareaController extends ProtoController
{
    /**
     * @type {NTextareaController}
     */
    declare scope : NTextareaController;

    /**
     * @type {NTextareaData}
     */
    declare data : NTextareaData;

    /**
     * @type {NTextareaView}
     */
    declare view : NTextareaView;

    constructor(props : any, context : SetupContext)
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
            .cloneProp('modelValue');

        this
            .makeData('focus')
            .makeRef('input');

        return this;
    }

}

export default NTextareaController;