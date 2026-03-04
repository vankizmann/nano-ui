import { Arr, Mix, Now, Obj } from "@kizmann/pico-js";
import { ProtoExtend, PositionData, TextData } from "../../../root/index.ts";
import { NPopoverPanelData } from "../../../popover/js/popover-panel/NPopoverPanelData.ts";
import { NDatetimepickerController } from "./NDatetimepickerController.ts";

export class NDatetimepickerData extends ProtoExtend([NPopoverPanelData, PositionData, TextData])
{
    /**
     * @type {NDatetimepickerController}
     */
    declare scope : NDatetimepickerController;

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

    get minDate() : any
    {
        return this.scope.get('minDate');
    }

    get maxDate() : any
    {
        return this.scope.get('maxDate');
    }

}

export interface NDatetimepickerData extends NPopoverPanelData,
    PositionData,
    TextData {
    //
}

export default NDatetimepickerData;