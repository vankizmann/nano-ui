import { SetupContext } from "vue";
import { Arr, Locale, Mix, Now, Num, Obj, Run, Str } from "@kizmann/pico-js";
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

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .cloneProp('modelValue');

        this
            .makeData('input')
            .makeData('index', 0);

        this
            .makeRef('input')
            .makeRef('scrollbar');

        this.watchProp('modelValue', () => {
            this.updateDuration();
        });

        this.updateDuration();

        return this;
    }

    updateDuration()
    {
        this.set('input', ...[
            NDateHelper.getDurationString(this),
        ]);
    }

    onReady()
    {
        this.scrollToIndex();
    }

    onOpen()
    {
        this.focusInput();
        this.resetDisplay();
    }

    onClose()
    {
        Run.frame(() => {
            this.updateDuration();
        });

        this.ref('input')?.value?.blur();
    }

    onInput()
    {
        const intval = NDateHelper.getDurationString(this);

        if ( intval === this.data.input ) {
            return this.applyIndex();
        }

        const value = NDateHelper.getDurationNumber(...[
            this, this.data.input
        ]);

        this.update('modelValue', value);
    }

    applyIndex()
    {
        const { data } = this;

        const value = Obj.get(...[
            data.options, data.index
        ]);

        this.update('modelValue', value);
    }

    focusInput()
    {
        Run.frame(() => {
            this.ref('input')?.value?.focus();
        });
    }

    resetDisplay()
    {
        const { data } = this;

        const index = Arr.findIndex(data.options, [
            data.model
        ], 0);

        this.set('index', Math.max(0, index));
    }

    scrollToIndex(index = null)
    {
        const { data } = this;

        if ( index == null ) {
            index = data.index;
        }

        index = Num.minmax(...[
            index, 0, data.options.length - 1
        ]);

        if ( index !== data.index ) {
            this.set('index', index);
        }

        this.ncx('scrollbar')?.scrollTo(...[
            data.index
        ]);
    }

}

export default NDurationpickerController;