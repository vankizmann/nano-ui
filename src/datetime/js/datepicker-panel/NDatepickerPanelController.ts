import { SetupContext } from "vue";
import { Arr, Mix, Now, Obj, Run } from "@kizmann/pico-js";
import { GroupController } from "../../../root/index.ts";
import { NDatepickerPanelView } from "./NDatepickerPanelView.ts";
import { NDatepickerPanelData } from "./NDatepickerPanelData.ts";
import { NDateHelper } from "../helper/NDateHelper.ts";


export class NDatepickerPanelController extends GroupController
{
    /**
     * @type {NDatepickerPanelController}
     */
    declare scope : NDatepickerPanelController;

    /**
     * @type {NDatepickerPanelData}
     */
    declare data : NDatepickerPanelData;

    /**
     * @type {NDatepickerPanelView}
     */
    declare view : NDatepickerPanelView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NDatepickerPanelView(this),
            new NDatepickerPanelData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .cloneProp('modelValue')
            .cloneProp('arrive')
            .cloneProp('depart');

        this.makeData('view', 'dates');
        this.makeData('ranges', []);
        this.makeData('hovers', []);

        this.makeData('dates', ...[
            NDateHelper.getDates(this)
        ]);

        this.makeData('displays', ...[
            NDateHelper.getDisplays(this)
        ]);

        this.watchProp('modelValue', () => {
            this.updateDates()
        });

        this.watchProp('arrive', () => {
            this.updateDates()
        });

        this.watchProp('depart', () => {
            this.updateDates()
        });

        return this;
    }

    updateDates()
    {
        this.set('dates', ...[
            NDateHelper.getDates(this)
        ]);
    }

    setDisplayDates(date : Now = null)
    {
        const dates = NDateHelper.getDisplays(...[
            this, date
        ]);

        this.set('displays', dates);
    }

    onPrev()
    {
        const { data } = this;

        let date = Arr.first(data.displays).clone();

        if ( data.view === 'dates' ) {
            date.sub(1, 'months');
        }

        if ( data.view === 'months' ) {
            date.sub(1, 'years');
        }

        if ( data.view === 'years' ) {
            date.sub(10, 'years');
        }

        this.setDisplayDates(date);
    }

    onNext()
    {
        const { data } = this;

        let date = Arr.first(data.displays).clone();

        if ( data.view === 'dates' ) {
            date.add(1, 'months');
        }

        if ( data.view === 'months' ) {
            date.add(1, 'years');
        }

        if ( data.view === 'years' ) {
            date.add(10, 'years');
        }

        this.setDisplayDates(date);
    }

    onRevert()
    {
        this.setDisplayDates();
        this.set('view', 'dates');
    }

    onMousedown(item : Now)
    {
        const { data } = this;

        this.update('modelValue', ...[
            item.format(data.format)
        ]);

        this.set('dateValue', item);
    }

    setPanelDate(item : Now)
    {
        Run.frame(() => {
            this.set('view', 'dates');
        });

        this.setDisplayDates(item);
    }

    setRangeDate(date : Now)
    {
        const { data } = this;

        if ( ! data.range ) {
            return this.setModelDate(date);
        }

        let [real, temp] = [
            Arr.filter(data.ranges), data.ranges
        ];

        if ( real.length !== 1 ) {
            temp = [null, null];
        }

        if ( real.length === 0 ) {
            temp[0] = date.clone();
        }

        if ( real.length === 1 ) {
            temp[1] = date.clone();
        }

        if ( date.before(temp[0]) ) {
            temp = temp.reverse();
        }

        if ( real.length === 1 ) {
            return this.setModelRange(temp);
        }

        this.set('hovers', [
            date.clone(), date.clone()
        ]);

        this.set('ranges', temp);
    }

    setHoverDate(date : Now)
    {
        const { data } = this;

        if ( ! data.ranges.length ) {
            return;
        }

        let hovers = [
            data.ranges[0], date.clone()
        ];

        if ( date.before(data.ranges[0]) ) {
            hovers = hovers.reverse();
        }

        this.set('hovers', hovers);
    }

    setModelDate(date : Now)
    {
        const { data } = this;

        let dates = [
            date.clone(), date.clone()
        ];

        this.update('modelValue', ...[
            date.format(data.format)
        ]);

        this.set('dates', dates);
    }

    setModelRange(dates : Now[])
    {
        const { data } = this;

        let values = Arr.each(dates, (date : Now) => {
            return date.format(data.format);
        });

        this.set('hovers', []);
        this.set('ranges', []);
        this.set('dates', dates);

        this.update('arrive', values[0]);
        this.update('depart', values[1]);
        this.update('modelValue', values);
    }

}

export default NDatepickerPanelController;