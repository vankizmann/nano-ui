import { Arr, Mix, Now, Obj } from "@kizmann/pico-js";
import { ProtoExtend, PositionData, TextData } from "../../../root/index.ts";
import { NPopoverPanelData } from "../../../popover/js/popover-panel/NPopoverPanelData.ts";
import { NDatepickerController } from "./NDatepickerController.ts";

export class NDatepickerData extends ProtoExtend([NPopoverPanelData, PositionData, TextData])
{
    /**
     * @type {NDatepickerController}
     */
    declare scope : NDatepickerController;

    get model() : string
    {
        return this.scope.get('modelValue');
    }

    get date() : Now
    {
        return this.scope.get('date');
    }

    get dates() : Now
    {
        return this.scope.get('dates');
    }

    get input() : string
    {
        return this.scope.get('input');
    }

    get inputs() : string
    {
        return this.scope.get('inputs');
    }

    get range() : boolean
    {
        return this.scope.get('range');
    }

    get placeholder() : string
    {
        return this.scope.get('placeholder');
    }

    get placeholderArrive() : string
    {
        return this.scope.get('placeholderArrive');
    }

    get placeholderDepart() : string
    {
        return this.scope.get('placeholderDepart');
    }

    get format() : string
    {
        return this.scope.get('format');
    }

    get displayFormat() : string
    {
        return this.scope.get('displayFormat');
    }

    get rangeSeperator() : string
    {
        return this.scope.get('rangeSeperator');
    }

    get minDate() : any
    {
        return this.scope.get('minDate');
    }

    get maxDate() : any
    {
        return this.scope.get('maxDate');
    }

    get clearArrive() : any
    {
        return this.scope.get('clearArrive');
    }

    get clearDepart() : any
    {
        return this.scope.get('clearDepart');
    }

}

export interface NDatepickerData extends NPopoverPanelData, PositionData, TextData {
}

export default NDatepickerData;