import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NEmptyIconView } from "./NEmptyIconView.ts";
import { NEmptyIconData } from "./NEmptyIconData.ts";

export class NEmptyIconController extends ProtoController
{
    /**
     * @type {NEmptyIconController}
     */
    declare scope : NEmptyIconController;

    /**
     * @type {NEmptyIconData}
     */
    declare data : NEmptyIconData;

    /**
     * @type {NEmptyIconView}
     */
    declare view : NEmptyIconView;

    constructor(props : any, context : SetupContext)
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

        return this;
    }

}

export default NEmptyIconController;