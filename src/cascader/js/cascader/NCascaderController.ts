import { SetupContext } from "vue";
import { Mix } from "@kizmann/pico-js";
import { NPopoverPanelController } from "../../../popover/js/popover-panel/NPopoverPanelController.ts";
import { NCascaderView } from "./NCascaderView.ts";
import { NCascaderData } from "./NCascaderData.ts";
import { NCascaderHelper } from "../helper/NCascaderHelper.ts";

export class NCascaderController extends NPopoverPanelController
{
    /**
     * @type {NCascaderController}
     */
    declare scope : NCascaderController;

    /**
     * @type {NCascaderData}
     */
    declare data : NCascaderData;

    /**
     * @type {NCascaderView}
     */
    declare view : NCascaderView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            // @ts-ignore
            new NCascaderView(this),
            // @ts-ignore
            new NCascaderData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .cloneProp('modelValue')
            .cloneProp('splitValue');

        this.makeRef('panel');

        let { model, split } = this.data;

        if ( Mix.isEmpty(model) && ! Mix.isEmpty(split) ) {
            NCascaderHelper.buildModelFromSplit(this);
        }

        if ( ! Mix.isEmpty(model) && Mix.isEmpty(split) ) {
            NCascaderHelper.buildSplitFromModel(this);
        }

        this.compData('virtuals', () => {
            return NCascaderHelper.getCascade(this);
        });

        return this;
    }

}

export default NCascaderController;