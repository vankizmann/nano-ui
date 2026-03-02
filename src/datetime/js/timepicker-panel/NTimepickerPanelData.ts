import { ProtoData } from "../../../root/index.ts";
import NTimepickerPanelController from "./NTimepickerPanelController.ts";
import { Now } from "@kizmann/pico-js";

export class NTimepickerPanelData extends ProtoData
{
    /**
     * @type {NTimepickerPanelController}
     */
    declare scope : NTimepickerPanelController;

    get classList() : string[]
    {
        let classList = [];

        return this.classRoot(classList);
    }

    get model() : string
    {
        return this.scope.get('modelValue');
    }

    get date() : Now
    {
        return this.scope.get('dateValue');
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

    get hoursInterval() : number
    {
        return this.scope.get('hoursInterval');
    }

    get minutesInterval() : number
    {
        return this.scope.get('minutesInterval');
    }

    get secondsInterval() : number
    {
        return this.scope.get('secondsInterval');
    }

    get gridDate() : Now
    {
        return this.date.reset({ time: !this.date.input });
    }

    get hoursGrid() : Now[]
    {
        return this.gridDate.getHoursGrid(this.hoursInterval);
    }

    get minutesGrid() : Now[]
    {
        return this.gridDate.getMinutesGrid(this.minutesInterval);
    }

    get secondsGrid() : Now[]
    {
        return this.gridDate.getSecondsGrid(this.secondsInterval);
    }

}

export default NTimepickerPanelData;