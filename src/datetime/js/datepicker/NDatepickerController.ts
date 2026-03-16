import { onMounted, SetupContext } from "vue";
import { Arr, Locale, Mix, Now, Obj, Run, Str } from "@kizmann/pico-js";
import { NPopoverPanelController } from "../../../popover/js/popover-panel/NPopoverPanelController.ts";
import { NDatepickerView } from "./NDatepickerView.ts";
import { NDatepickerData } from "./NDatepickerData.ts";
import { NDateHelper } from "../helper/NDateHelper.ts";

export class NDatepickerController extends NPopoverPanelController
{
    /**
     * @type {NDatepickerController}
     */
    declare scope : NDatepickerController;

    /**
     * @type {NDatepickerData}
     */
    declare data : NDatepickerData;

    /**
     * @type {NDatepickerView}
     */
    declare view : NDatepickerView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            // @ts-ignore
            new NDatepickerView(this),
            // @ts-ignore
            new NDatepickerData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .makeRef('input')
            .makeRef('arrive')
            .makeRef('depart')
            .makeRef('panel');

        this
            .cloneProp('modelValue')
            .cloneProp('arrive')
            .cloneProp('depart');

        this
            .makeData('input')
            .makeData('inputs')
            .makeData('date')
            .makeData('dates');

        this.watchData('modelValue', () => {
            this.updateDates();
        });

        this.updateDates();

        return this;
    }

    updateDates()
    {
        const { data } = this;

        const date = this.set('date', ...[
            NDateHelper.getDate(this)
        ]);

        this.set('input', ...[
            date.input ? date.format(data.displayFormat) : '',
        ]);

        const dates = this.set('dates', ...[
            NDateHelper.getDates(this)
        ]);

        this.set('inputs', [
            dates[0].input ? dates[0].format(data.displayFormat) : '',
            dates[1].input ? dates[1].format(data.displayFormat) : '',
        ]);
    }

    applyClear()
    {
        let model = Obj.clone(...[
            this.data.clearValue
        ]);

        const arrive = Obj.clone(...[
            this.data.clearArrive
        ]);

        const depart = Obj.clone(...[
            this.data.clearDepart
        ]);

        if ( this.data.range ) {
            model = [arrive, depart];
        }

        this.update('modelValue', model);

        if ( this.data.range ) {
            this.update('arrive', arrive);
            this.update('depart', depart);
        }

        this.updateDates();
    }

    onClose()
    {
        this.ref('input')?.value?.blur();
        this.ref('arrive')?.value?.blur();
        this.ref('depart')?.value?.blur();
        this.updateDates();
    }

    onInput()
    {
        const { data } = this;

        let date = Now.make(...[
            data.input, data.displayFormat
        ]);

        if ( !date.valid() ) {
            return this.updateDates();
        }

        if ( data.minDate && date.before(data.minDate) ) {
            date = Now.make(data.minDate);
        }

        if ( data.maxDate && date.after(data.maxDate) ) {
            date = Now.make(data.maxDate);
        }

        this.update(...[
            'modelValue', date.format(data.format)
        ]);
    }

    onArrive()
    {
        const { data } = this;

        let date = Now.make(...[
            data.inputs[0], data.displayFormat
        ]);

        if ( !date.valid() ) {
            return this.updateDates();
        }

        if ( data.minDate && date.before(data.minDate) ) {
            date = Now.make(data.minDate);
        }

        if ( data.maxDate && date.after(data.maxDate) ) {
            date = Now.make(data.maxDate);
        }

        let items = [
            date, data.dates[1]
        ];

        items = Arr.each(items, (item:Now) => {
            return item.format(data.format);
        });

        this.update(...[
            'arrive', date.format(data.format)
        ]);

        this.update('modelValue', items);
    }

    onDepart()
    {
        const { data } = this;

        let date = Now.make(...[
            data.inputs[1], data.displayFormat
        ]);

        if ( !date.valid() ) {
            return this.updateDates();
        }

        if ( data.minDate && date.before(data.minDate) ) {
            date = Now.make(data.minDate);
        }

        if ( data.maxDate && date.after(data.maxDate) ) {
            date = Now.make(data.maxDate);
        }

        let items = [
            data.dates[0], date
        ];

        items = Arr.each(items, (item:Now) => {
            return item.format(data.format);
        });

        this.update(...[
            'depart', date.format(data.format)
        ]);

        this.update('modelValue', items);
    }

}

export default NDatepickerController;