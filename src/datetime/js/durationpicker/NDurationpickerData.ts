import { Arr, Mix, Now, Obj } from "@kizmann/pico-js";
import { ProtoExtend, PositionData, TextData } from "../../../root/index.ts";
import { NPopoverPanelData } from "../../../popover/js/popover-panel/NPopoverPanelData.ts";
import { NDurationpickerController } from "./NDurationpickerController.ts";

export class NDurationpickerData extends ProtoExtend([NPopoverPanelData, PositionData, TextData])
{
    /**
     * @type {NDurationpickerController}
     */
    declare scope : NDurationpickerController;

    get model() : string
    {
        return this.scope.get('modelValue');
    }

    get input() : string
    {
        return this.scope.get('input');
    }

    get placeholder() : string
    {
        return this.scope.get('placeholder');
    }

    get minDuration() : any
    {
        return this.scope.get('minDuration');
    }

    get maxDuration() : any
    {
        return this.scope.get('maxDuration');
    }

}

export interface NDurationpickerData extends NPopoverPanelData, PositionData, TextData {
}

export default NDurationpickerData;