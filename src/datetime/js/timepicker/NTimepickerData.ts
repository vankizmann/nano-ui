import { Arr, Mix, Now, Obj } from "@kizmann/pico-js";
import { ProtoExtend, PositionData, TextData } from "../../../root/index.ts";
import { NPopoverPanelData } from "../../../popover/js/popover-panel/NPopoverPanelData.ts";
import { NTimepickerController } from "./NTimepickerController.ts";

export class NTimepickerData extends ProtoExtend([NPopoverPanelData, PositionData, TextData])
{
    /**
     * @type {NTimepickerController}
     */
    declare scope : NTimepickerController;

    get model() : string
    {
        return this.scope.get('modelValue');
    }

    get date() : Now
    {
        return this.scope.get('date');
    }

    get input() : string
    {
        return this.scope.get('input');
    }

    get placeholder() : string
    {
        return this.scope.get('placeholder');
    }

    get format() : string
    {
        return this.scope.get('format');
    }

    get displayFormat() : string
    {
        return this.scope.get('displayFormat');
    }

}

export interface NTimepickerData extends NPopoverPanelData, PositionData, TextData {
}

export default NTimepickerData;