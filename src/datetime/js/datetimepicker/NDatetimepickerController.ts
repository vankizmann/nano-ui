import { SetupContext } from "vue";
import { Arr, Locale, Mix, Now, Obj, Run, Str } from "@kizmann/pico-js";
import { NPopoverPanelController } from "../../../popover/js/popover-panel/NPopoverPanelController.ts";
import { NDatetimepickerView } from "./NDatetimepickerView.ts";
import { NDatetimepickerData } from "./NDatetimepickerData.ts";
import { NDateHelper } from "../helper/NDateHelper.ts";

export class NDatetimepickerController extends NPopoverPanelController
{
    /**
     * @type {NDatetimepickerController}
     */
    declare scope : NDatetimepickerController;

    /**
     * @type {NDatetimepickerData}
     */
    declare data : NDatetimepickerData;

    /**
     * @type {NDatetimepickerView}
     */
    declare view : NDatetimepickerView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            // @ts-ignore
            new NDatetimepickerView(this),
            // @ts-ignore
            new NDatetimepickerData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .makeRef('input')
            .makeRef('datepicker')
            .makeRef('timepicker');

        this.cloneProp('modelValue');

        this
            .makeData('input')
            .makeData('date');

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
    }

    onClose()
    {
        this.ref('input')?.value?.blur();
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

}

export default NDatetimepickerController;