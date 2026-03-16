import { provide, SetupContext } from "vue";
import { GroupController } from "../../../root/index.ts";
import { NInfoView } from "./NInfoView.ts";
import { NInfoData } from "./NInfoData.ts";


export class NInfoController extends GroupController
{
    /**
     * @type {NInfoController}
     */
    declare scope : NInfoController;

    /**
     * @type {NInfoData}
     */
    declare data: NInfoData;

    /**
     * @type {NInfoView}
     */
    declare view: NInfoView;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NInfoView(this),
            new NInfoData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        provide('NInfo', this.instance);

        return this;
    }

}

export default NInfoController;