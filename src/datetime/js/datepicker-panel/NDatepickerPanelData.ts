import { ProtoData } from "../../../root/index.ts";
import NDatepickerPanelController from "./NDatepickerPanelController.ts";
import { Arr, Now } from "@kizmann/pico-js";

export class NDatepickerPanelData extends ProtoData
{
    /**
     * @type {NDatepickerPanelController}
     */
    declare scope : NDatepickerPanelController;

    classDate(date: Now)
    {
        const valids = Arr.filter(this.dates, (date:Now) => {
            return date.input;
        });

        if ( this.ranges.length ) {
            return this.classDateHover(date);
        }

        if ( valids.length ) {
            return this.classDateNormal(date)
        }

        return [];
    }

    classDateNormal(date: Now)
    {
        let classList = [];

        if ( date.equalDate(this.dates[0]) ) {
            classList.push('n-arrive');
            classList.push('n-selected');
        }

        if ( date.equalDate(this.dates[1]) ) {
            classList.push('n-depart');
            classList.push('n-selected');
        }

        if ( date.between(...this.dates) ) {
            classList.push('n-between');
            classList.push('n-selected');
        }

        return Arr.unique(classList);
    }

    classDateHover(date: Now)
    {
        let classList = [];

        if ( date.equalDate(this.hovers[0]) ) {
            classList.push('n-arrive');
        }

        if ( date.equalDate(this.hovers[1]) ) {
            classList.push('n-depart');
        }

        if ( date.between(...this.hovers) ) {
            classList.push('n-between');
        }

        return classList;
    }

    get classList() : string[]
    {
        let classList = [];

        return this.classRoot(classList);
    }

    get model() : string|string[]
    {
        return this.scope.get('modelValue');
    }

    get dates() : Now[]
    {
        return this.scope.get('dates');
    }

    get displays() : Now[]
    {
        return this.scope.get('displays');
    }

    get ranges() : Now[]
    {
        return this.scope.get('ranges');
    }

    get hovers() : Now[]
    {
        return this.scope.get('hovers');
    }

    get view() : string
    {
        return this.scope.get('view');
    }

    get arrive() : string
    {
        return this.scope.get('arrive');
    }

    get depart() : string
    {
        return this.scope.get('depart');
    }

    get range() : boolean
    {
        return this.scope.get('range');
    }

    get panels() : number
    {
        return this.scope.get('panels');
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

    get yearsGrid() : Now[]
    {
        return Arr.first(this.displays).getYearsGrid();
    }

    get monthsGrid() : Now[]
    {
        return Arr.first(this.displays).getMonthsGrid();
    }

}

export default NDatepickerPanelData;