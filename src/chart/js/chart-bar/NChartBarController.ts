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
    declare data: NChartBarData;

    /**
     * @type {NChartBarView}
     */
    declare view: NChartBarView;

    constructor(props:any, context:SetupContext)
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

        this.makeData('total');
        this.makeData('minval');
        this.makeData('maxval');

        provide('NChart', this.instance);

        this.watchChilds(() => {
            this.makeTotal();
            this.makeMinval();
            this.makeMaxval();
        });

        this.makeTotal();
        this.makeMinval();
        this.makeMaxval();

        return this;
    }

    makeTotal() : void
    {
        let count = Arr.each(this.childs, (item : any) => {
            return Mix.num(item.data.value);
        });

        this.set('total', Num.combine(count));
    }

    makeMinval() : void
    {
        let min = Number.MAX_VALUE;

        Arr.each(this.childs, (item : any) => {
            min = Math.min(min, Mix.num(item.data.value));
        });

        this.set('minval', Mix.num(min));
    }

    makeMaxval() : void
    {
        let max = Number.MIN_VALUE;

        Arr.each(this.childs, (item : NChartItemController) => {
            max = Math.max(max, Mix.num(item.data.value));
        });

        this.set('maxval', Mix.num(max));
    }

    getHeight(value : string|number) : number
    {
        const { maxval, minHeight : min } = this.data;

        return Num.int(...[
            ((100 - min) / maxval * Mix.num(value)) + min
        ]);
    }

}

export default NChartBarController;