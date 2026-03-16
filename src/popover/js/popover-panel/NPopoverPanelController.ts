import { onMounted, SetupContext } from "vue";
import { Dom, Run } from "@kizmann/pico-js";
import { ProtoController } from "../../../root/index.ts";
import { NPopoverPanelView } from "./NPopoverPanelView.ts";
import { NPopoverPanelData } from "./NPopoverPanelData.ts";

export class NPopoverPanelController extends ProtoController
{
    /**
     * @type {NPopoverPanelController}
     */
    declare scope : NPopoverPanelController;

    /**
     * @type {NPopoverPanelData}
     */
    declare data: NPopoverPanelData;

    /**
     * @type {NPopoverPanelView}
     */
    declare view: NPopoverPanelView;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NPopoverPanelView(this),
            new NPopoverPanelData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .makeRef('el')
            .makeRef('popover');

        this.makeData('focus', 0);

        return this;
    }

    onReady()
    {
        //
    }

    onOpen()
    {
        //
    }

    onClose()
    {
        //
    }

    onFocus()
    {
        Run.frame(() => {
            this.dom('el').child().pointerdown();
        });
    }

    onBlur()
    {
        Run.frame(() => {
            Dom.find(window).pointerdown();
        });
    }

}

export default NPopoverPanelController;