import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NTagView } from "./NTagView.ts";
import { NTagData } from "./NTagData.ts";


export class NTagController extends ProtoController
{
    /**
     * @type {NTagController}
     */
    declare scope : NTagController;

    /**
     * @type {NTagData}
     */
    declare data: NTagData;

    /**
     * @type {NTagView}
     */
    declare view: NTagView;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NTagView(this),
            new NTagData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        return this;
    }

}

export default NTagController;