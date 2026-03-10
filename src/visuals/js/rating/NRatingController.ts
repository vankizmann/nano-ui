import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NRatingView } from "./NRatingView.ts";
import { NRatingData } from "./NRatingData.ts";


export class NRatingController extends ProtoController
{
    /**
     * @type {NRatingController}
     */
    declare scope : NRatingController;

    /**
     * @type {NRatingData}
     */
    declare data: NRatingData;

    /**
     * @type {NRatingView}
     */
    declare view: NRatingView;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NRatingView(this),
            new NRatingData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        return this;
    }

}

export default NRatingController;