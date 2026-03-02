import { onMounted, onUnmounted } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NCheckboxView } from "./NCheckboxView.ts";
import { NCheckboxData } from "./NCheckboxData.ts";
import { SetupContext } from "vue";


export class NCheckboxController extends ProtoController
{
    /**
     * @type {NCheckboxController}
     */
    declare scope : NCheckboxController;

    /**
     * @type {NCheckboxData}
     */
    declare data : NCheckboxData;

    /**
     * @type {NCheckboxView}
     */
    declare view : NCheckboxView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NCheckboxView(this),
            new NCheckboxData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        this.injectRef([
            'group', 'NCheckboxGroup'
        ]);

        return this;
    }

    onMounted()
    {
        //
    }

    onUnmounted()
    {
        //
    }

    superToggle()
    {
        //
    }

}

export default NCheckboxController;