import { SetupContext } from "vue";
import { Arr, Mix, Now, Obj } from "@kizmann/pico-js";
import { GroupController } from "../../../root/index.ts";
import { NTimepickerPanelView } from "./NTimepickerPanelView.ts";
import { NTimepickerPanelData } from "./NTimepickerPanelData.ts";

export class NTimepickerPanelController extends GroupController
{
    /**
     * @type {NTimepickerPanelController}
     */
    declare scope : NTimepickerPanelController;

    /**
     * @type {NTimepickerPanelData}
     */
    declare data : NTimepickerPanelData;

    /**
     * @type {NTimepickerPanelView}
     */
    declare view : NTimepickerPanelView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NTimepickerPanelView(this),
            new NTimepickerPanelData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.cloneProp('modelValue');

        // this.makeRef('el');

        this.makeLinkProp('dateValue', 'modelValue', () => {
            return Now.make(this.data.model);
        });

        return this;
    }

    onMousedown(item : Now)
    {
        const { data } = this;

        this.update('modelValue', ...[
            item.format(data.format)
        ]);

        this.set('dateValue', item);
    }

}

export default NTimepickerPanelController;