import { provide, SetupContext } from "vue";
import { GroupController } from "../../../root/index.ts";
import { NTabsView } from "./NTabsView.ts";
import { NTabsData } from "./NTabsData.ts";
import { Arr, Num, Run } from "@kizmann/pico-js";


export class NTabsController extends GroupController
{
    /**
     * @type {NTabsController}
     */
    declare scope : NTabsController;

    /**
     * @type {NTabsData}
     */
    declare data: NTabsData;

    /**
     * @type {NTabsView}
     */
    declare view: NTabsView;

    /**
     * @type {ResizeObserver}
     */
    resizer : ResizeObserver;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NTabsView(this),
            new NTabsData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.cloneProp('modelValue');

        this
            .makeData('sorted')
            .makeData('value');

        this
            .makeRef('el')
            .makeRef('indicator');

        this.watchData('modelValue', () => {
            this.updateTabs();
        });

        this.watchChilds(() => {
            this.updateTabs();
        });

        provide('NTabs', this.instance);

        return this;
    }

    onMounted()
    {
        // @ts-ignore
        this.resizer = new ResizeObserver(Run.debounce(() => {
            Run.async(() => this.updateIndicator());
        }, 50));
    }

    onUnmounted()
    {
        this.resizer.disconnect();
        this.resizer = null;
    }

    updateTabs()
    {
        let { model } = this.data;

        const sorted = Arr.sort(...[
            this.childs, 'data.sort'
        ]);

        const names = Arr.extract(...[
            sorted, 'data.name'
        ]);

        let value = model;

        if ( ! Arr.has(names, value) ) {
            value = Arr.first(names);
        }

        this.set('value', value);
        this.set('sorted', sorted);

        Run.frame(() => {
            this.updateIndicator();
        });
    }

    updateIndicator()
    {
        const [el, pl] = [
            this.dom('indicator'), this.dom('indicator').parent()
        ];

        const tl = pl.child('.n-active');

        const [offset, width] = [
            tl.offset('left', pl), tl.width() / 100,
        ];

        const transform = [
            `scaleX(${Num.fixed(width, 2)})`,
            `translateX(${Num.fixed(offset / width, 2)}px)`,
        ];

        el.style({
            transform: transform.join(' ')
        });

        el.addClass('n-ready');
    }

    superToggle(value: string)
    {
        this.update('modelValue', value);
    }

}

export default NTabsController;