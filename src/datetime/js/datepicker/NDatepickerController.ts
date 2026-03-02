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
            date.format(data.displayFormat),
        ]);

        const dates = this.set('dates', ...[
            NDateHelper.getDates(this)
        ]);

        this.set('inputs', [
            dates[0].format(data.displayFormat),
            dates[1].format(data.displayFormat),
        ]);
    }

    onClose()
    {
        this.ref('input')?.value?.blur();
        this.ref('arrive')?.value?.blur();
        this.ref('depart')?.value?.blur();
        this.updateDates();
    }

    onSingle()
    {
        const { data } = this;

        const date = Now.make(...[
            data.input, data.displayFormat
        ]);

        if ( !date.valid() ) {
            return this.updateDates();
        }

        this.update(...[
            'modelValue', date.format(data.format)
        ]);
    }

}

export default NDatepickerController;