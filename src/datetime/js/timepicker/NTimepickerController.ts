import { SetupContext } from "vue";
import { Now } from "@kizmann/pico-js";
import { NPopoverPanelController } from "../../../popover/js/popover-panel/NPopoverPanelController.ts";
import { NTimepickerView } from "./NTimepickerView.ts";
import { NTimepickerData } from "./NTimepickerData.ts";
import { NDateHelper } from "../helper/NDateHelper.ts";

export class NTimepickerController extends NPopoverPanelController
{
    /**
     * @type {NTimepickerController}
     */
    declare scope : NTimepickerController;

    /**
     * @type {NTimepickerData}
     */
    declare data : NTimepickerData;

    /**
     * @type {NTimepickerView}
     */
    declare view : NTimepickerView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            // @ts-ignore
            new NTimepickerView(this),
            // @ts-ignore
            new NTimepickerData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.cloneProp('modelValue');

        this
            .makeRef('input')
            .makeRef('panel');

        this
            .makeData('date')
            .makeData('input');

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
        this.ref('input')?.value.blur()
        this.updateDates();
    }

    onEnter()
    {
        const { data } = this;

        const date = Now.make(...[
            data.input, data.displayFormat
        ]);

        if ( ! date.valid() ) {
            return this.updateDates();
        }

        this.update(...[
            'modelValue', date.format(data.format)
        ]);
    }

}

export default NTimepickerController;