import { provide, SetupContext } from "vue";
import { GroupController } from "../../../root/index.ts";
import { NCollapseView } from "./NCollapseView.ts";
import { NCollapseData } from "./NCollapseData.ts";
import { Arr, Num, Run } from "@kizmann/pico-js";


export class NCollapseController extends GroupController
{
    /**
     * @type {NCollapseController}
     */
    declare scope : NCollapseController;

    /**
     * @type {NCollapseData}
     */
    declare data: NCollapseData;

    /**
     * @type {NCollapseView}
     */
    declare view: NCollapseView;

    /**
     * @type {ResizeObserver}
     */
    resizer : ResizeObserver;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NCollapseView(this),
            new NCollapseData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.cloneProp('modelValue');

        this
            .makeData('sorted');

        this.watchData('modelValue', () => {
            this.updateTabs();
        });

        this.watchChilds(() => {
            this.updateTabs();
        });

        provide('NCollapse', this.instance);

        return this;
    }

    updateTabs()
    {
        const sorted = Arr.sort(...[
            this.childs, 'data.sort'
        ]);

        this.set('sorted', sorted);
    }

    superFixed(value: string)
    {
        const { model } = this.data;

        if ( Arr.has(model, value) ) {
            return;
        }

        const result = Arr.toggle(...[
            Arr.clone(model), value
        ]);

        this.update('modelValue', result);
    }

    superToggle(value: string)
    {
        const { model } = this.data;

        const result = Arr.toggle(...[
            Arr.clone(model), value
        ]);

        this.update('modelValue', result);
    }

}

export default NCollapseController;