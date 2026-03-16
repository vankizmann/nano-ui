import { SetupContext, onMounted } from "vue";
import { Arr, Locale, Mix, Num, Obj, Run, Str } from "@kizmann/pico-js";
import { NPopoverPanelController } from "../../../popover/js/popover-panel/NPopoverPanelController.ts";
import { NSelectView } from "./NSelectView.ts";
import { NSelectData } from "./NSelectData.ts";
import { Helpers } from "../../../root/index.ts";

export class NSelectController extends NPopoverPanelController
{
    /**
     * @type {NSelectController}
     */
    declare scope : NSelectController;

    /**
     * @type {NSelectData}
     */
    declare data : NSelectData;

    /**
     * @type {NSelectView}
     */
    declare view : NSelectView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NSelectView(this),
            // @ts-ignore
            new NSelectData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .cloneProp('modelValue');

        this
            .makeRef('input')
            .makeRef('scrollbar');

        this
            .makeData('search', '')
            .makeData('index', 0);

        this.compData('prepared', () => {
            return Helpers.Option.getFlat(this);
        });

        this.compData('virtuals', () => {
            return Helpers.Option.getCombineList(...[
                this, this.data.prepared
            ]);
        });

        this.compData('searched', () => {
            return Helpers.Option.getFilterList(...[
                this, this.data.virtuals
            ]);
        });

        return this;
    }

    onMounted()
    {
        this.resetDisplay();
    }

    onReady()
    {
        this.scrollToIndex();
    }

    onOpen()
    {
        this.set('search', '');
        this.focusInput();
        this.resetDisplay();
    }

    onClose()
    {
        this.ref('input')?.value?.blur();
        this.set('search', '');
    }

    onEnter()
    {
        const { data } = this;

        const slice : [any[], number] = [
            data.searched, data.index
        ];

        let model = data.model;

        if ( data.searched.length ) {
            model = Arr.get(...slice)?.value;
        }

        if ( data.allowCreate ) {
            model = data.search || model;
        }

        if ( Arr.matches(data.model, model) ) {
            return;
        }

        if ( !Mix.isEmpty(model) ) {
            this.applyModel(model);
        }

        this.set('search', '');
    }

    applyModel(value:any)
    {
        const { data } = this;

        let model = Arr.all(data.model);

        if ( Mix.isArr(model) ) {
            model = Arr.filter(model);
        }

        if ( !Mix.isEmpty(value) ) {
            Arr.toggle(model, value);
        }

        if ( !data.multiple ) {
            model = Arr.last(model);
        }

        const clearValue = Obj.clone(...[
            data.clearValue,
        ]);

        if ( Mix.isEmpty(value) ) {
            model = clearValue;
        }

        const denyUpdate = Mix.isEmpty(model)
            && ! data.clearable
            && ! data.multiple;

        if ( ! denyUpdate ) {
            this.update('modelValue', model);
        }
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

        const index = Arr.findIndex(data.virtuals, {
            value: Arr.first(data.model)
        }, 0);

        this.set('index', Math.max(0, index));
    }

    scrollToIndex(index = null)
    {
        const { data } = this;

        if ( index == null ) {
            index = data.index;
        }

        index = Num.minmax(...[
            index, 0, data.searched.length - 1
        ]);

        if ( index !== data.index ) {
            this.set('index', index);
        }

        this.ncx('scrollbar')?.scrollTo(...[
            data.index
        ]);
    }

}

export default NSelectController;