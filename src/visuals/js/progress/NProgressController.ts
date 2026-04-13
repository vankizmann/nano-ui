import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NProgressView } from "./NProgressView.ts";
import { NProgressData } from "./NProgressData.ts";


export class NProgressController extends ProtoController
{
    /**
     * @type {NProgressController}
     */
    declare scope : NProgressController;

    /**
     * @type {NProgressData}
     */
    declare data: NProgressData;

    /**
     * @type {NProgressView}
     */
    declare view: NProgressView;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NProgressView(this),
            new NProgressData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeRef('el');
        this.cloneProp('modelValue');

        return this;
    }

}

export default NProgressController;