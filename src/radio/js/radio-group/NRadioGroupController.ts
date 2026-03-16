import { provide, SetupContext } from "vue";
import { GroupController } from "../../../root/index.ts";
import { NRadioGroupView } from "./NRadioGroupView.ts";
import { NRadioGroupData } from "./NRadioGroupData.ts";

export class NRadioGroupController extends GroupController
{
    /**
     * @type {NRadioGroupController}
     */
    declare scope : NRadioGroupController;

    /**
     * @type {NRadioGroupData}
     */
    declare data : NRadioGroupData;

    /**
     * @type {NRadioGroupView}
     */
    declare view : NRadioGroupView;

    constructor(props : any, context : SetupContext)
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

    superApply(child:any)
    {
        this.update('modelValue', child.data.value);
    }

}

export default NRadioGroupController;