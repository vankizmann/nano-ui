import { ProtoController } from "../../../root/index.ts";
import { NButtonGroupView } from "./NButtonGroupView.ts";
import { NButtonGroupData } from "./NButtonGroupData.ts";
import { SetupContext } from "vue";

export class NButtonGroupController extends ProtoController
{
    /**
     * @type {NButtonGroupController}
     */
    declare scope : NButtonGroupController;

    /**
     * @type {NButtonGroupData}
     */
    declare data : NButtonGroupData;

    /**
     * @type {NButtonGroupView}
     */
    declare view : NButtonGroupView;

    constructor(props : any, context : SetupContext)
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

        return this;
    }

}

export default NButtonGroupController;