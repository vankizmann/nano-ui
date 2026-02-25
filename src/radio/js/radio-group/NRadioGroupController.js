import { GroupController } from "../../../root/index.js";
import { NRadioGroupProps } from "./NRadioGroup.js";
import { NRadioGroupView } from "./NRadioGroupView.jsx";
import { NRadioGroupData } from "./NRadioGroupData.js";
import { provide } from "vue";

/**
 * @class NRadioGroupController
 * @extends {GroupController<NRadioGroupController, NRadioGroupProps, NRadioGroupView, NRadioGroupData>}
 */
export class NRadioGroupController extends GroupController
{

    constructor(props, context)
    {
        super(props, context);

        [this.view, this.data] = [
            new NRadioGroupView(this),
            new NRadioGroupData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.cloneProp('modelValue');

        provide('NRadioGroup', this.instance);

        return this;
    }

    apply(child)
    {
        this.data.model = child.data.value;
    }

}

export default NRadioGroupController;