import { provide, SetupContext } from "vue";
import { GroupController } from "../../../root/index.ts";
import { NChartDonutView } from "./NChartDonutView.ts";
import { NChartDonutData } from "./NChartDonutData.ts";
import { Mix, Arr, Num } from "@kizmann/pico-js";
import NChartItemController from "../chart-item/NChartItemController.ts";


export class NChartDonutController extends GroupController
{
    /**
     * @type {NChartDonutController}
     */
    declare scope : NChartDonutController;

    /**
     * @type {NChartDonutData}
     */
    declare data : NChartDonutData;

    /**
     * @type {NChartDonutView}
     */
    declare view : NChartDonutView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NChartDonutView(this),
            new NChartDonutData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeRef('text');

        this.makeData('maxval');
        this.makeData('total');
        this.makeData('visible');
        this.makeData('hidden');

        provide('NChart', this.instance);

        this.watchProp('limit', () => {
            this.makeDataset();
            this.makeTotal();
            this.makeMaxval();
        });

        this.watchChilds(() => {
            this.makeDataset();
            this.makeTotal();
            this.makeMaxval();
        });

        this.makeDataset();
        this.makeTotal();
        this.makeMaxval();

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

    makeTotal() : void
    {
        let count = Arr.each(this.childs, (item : any) => {
            return Num.float(item.data.value);
        });

        this.set('total', Num.combine(count));
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

    getDistance(value : string | number) : number
    {
        const { length, width, total } = this.data;

        let gaps = 360 - (length * width * 2);

        return (gaps * Mix.num(value) / total) + (width * 2);
    }

    onPointerenter(item : any) : void
    {
        this.dom('text').style({
            '--n-chart-label': `'${item.axis}'`,
            '--n-chart-value': Mix.int(item.value)
        });
    }

    onPointerleave(item : any) : void
    {
        this.dom('text').style(null);
    }

}

export default NChartDonutController;