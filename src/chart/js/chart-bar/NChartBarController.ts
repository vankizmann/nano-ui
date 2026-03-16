import { provide, SetupContext } from "vue";
import { GroupController } from "../../../root/index.ts";
import { NChartBarView } from "./NChartBarView.ts";
import { NChartBarData } from "./NChartBarData.ts";
import { Mix, Arr, Num } from "@kizmann/pico-js";
import NChartItemController from "../chart-item/NChartItemController.ts";


export class NChartBarController extends GroupController
{
    /**
     * @type {NChartBarController}
     */
    declare scope : NChartBarController;

    /**
     * @type {NChartBarData}
     */
    declare data : NChartBarData;

    /**
     * @type {NChartBarView}
     */
    declare view : NChartBarView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NChartBarView(this),
            new NChartBarData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeData('maxval');
        this.makeData('avgval');
        this.makeData('visible');
        this.makeData('hidden');

        provide('NChart', this.instance);

        this.watchProp('limit', () => {
            this.makeDataset();
            this.makeMaxval();
            this.makeAvgval();
        });

        this.watchChilds(() => {
            this.makeDataset();
            this.makeMaxval();
            this.makeAvgval();
        });

        this.makeDataset();
        this.makeMaxval();
        this.makeAvgval();

        return this;
    }

    makeDataset() : void
    {
        const { data } = this;

        let items = !data.sort ?
            Arr.clone(this.childs) :
            Arr.sort(this.childs, 'data.value').reverse();

        const temp = Arr.slice(...[
            items, 0, data.limit ?? items.length
        ]);

        const visible = Arr.filter(items, (el : any) => {
            return Arr.find(temp, { uid: el.uid }) != null;
        });

        this.set('visible', visible);

        const hidden = Arr.filter(items, (el : any) => {
            return Arr.find(temp, { uid: el.uid }) == null;
        });

        this.set('hidden', hidden);
    }

    makeMaxval() : void
    {
        let other = Number.MIN_VALUE;

        Arr.each(this.data.hidden, (item : NChartItemController) => {
            other += Mix.num(item.data.value);
        });

        let max = other;

        Arr.each(this.data.visible, (item : NChartItemController) => {
            max = Math.max(max, Mix.num(item.data.value));
        });

        this.set('maxval', max);
    }

    makeAvgval() : void
    {
        let total = 0;

        Arr.each(this.childs, (item : NChartItemController) => {
            total += Mix.num(item.data.value);
        });

        const avg = Num.fixed(...[
            total / this.childs.length, 1
        ]);

        this.set('avgval', avg);
    }

    getHeight(value : string | number) : number
    {
        const { maxval, minHeight: min } = this.data;

        return Num.int(...[
            ((100 - min) / maxval * Mix.num(value)) + min
        ]);
    }

}

export default NChartBarController;