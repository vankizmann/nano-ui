import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NFormBagView } from "./NFormBagView.ts";
import { NFormBagData } from "./NFormBagData.ts";


export class NFormBagController extends ProtoController
{
    /**
     * @type {NFormBagController}
     */
    declare scope : NFormBagController;

    /**
     * @type {NFormBagData}
     */
    declare data: NFormBagData;

    /**
     * @type {NFormBagView}
     */
    declare view: NFormBagView;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NFormBagView(this),
            new NFormBagData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.injectRef([
            'form', 'NForm'
        ]);

        return this;
    }

}

export default NFormBagController;