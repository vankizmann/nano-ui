import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NButtonView } from "./NButtonView.ts";
import { NButtonData } from "./NButtonData.ts";


export class NButtonController extends ProtoController
{
    /**
     * @type {NButtonController}
     */
    declare scope : NButtonController;

    /**
     * @type {NButtonData}
     */
    declare data: NButtonData;

    /**
     * @type {NButtonView}
     */
    declare view: NButtonView;

    constructor(props:any, context:SetupContext)
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

        return this;
    }

}

export default NButtonController;