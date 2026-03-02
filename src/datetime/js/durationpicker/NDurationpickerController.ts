import { SetupContext } from "vue";
import { Arr, Locale, Mix, Now, Obj, Run, Str } from "@kizmann/pico-js";
import { NPopoverPanelController } from "../../../popover/js/popover-panel/NPopoverPanelController.ts";
import { NDurationpickerView } from "./NDurationpickerView.ts";
import { NDurationpickerData } from "./NDurationpickerData.ts";
import { NDateHelper } from "../helper/NDateHelper.ts";

export class NDurationpickerController extends NPopoverPanelController
{
    /**
     * @type {NDurationpickerController}
     */
    declare scope : NDurationpickerController;

    /**
     * @type {NDurationpickerData}
     */
    declare data : NDurationpickerData;

    /**
     * @type {NDurationpickerView}
     */
    declare view : NDurationpickerView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            // @ts-ignore
            new NDurationpickerView(this),
            // @ts-ignore
            new NDurationpickerData(this),
        ];
        console.log(this.data)

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeRef('input');

        this.cloneProp('modelValue');

        this.makeData('input');

        this.watchData('modelValue', () => {
            this.updateDuration();
        });

        this.updateDuration();

        return this;
    }

    updateDuration()
    {
        const { data } = this;

        console.log(data);
        NDateHelper.humanDuration(this);

        // const date = this.set('input', ...[
        //     NDateHelper.humanDuration(this)
        // ]);

        // this.set('input', ...[
        //     date.format(data.displayFormat),
        // ]);
    }

    onClose()
    {
        this.ref('input')?.value?.blur();
        this.updateDuration();
    }

    onInput()
    {
        const { data } = this;

        let date = Now.make(...[
            data.input, data.displayFormat
        ]);

        if ( !date.valid() ) {
            return this.updateDuration();
        }

        if ( data.minDate && date.before(data.minDate) ) {
            date = Now.make(data.minDate);
        }

        if ( data.maxDate && date.after(data.maxDate) ) {
            date = Now.make(data.maxDate);
        }

        console.log(this, data.format, date.format());

        this.update(...[
            'modelValue', date.format(data.format)
        ]);
    }

}

export default NDurationpickerController;