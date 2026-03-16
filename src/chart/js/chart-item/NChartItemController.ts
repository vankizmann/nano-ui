import { ProtoController } from "../../../root/index.ts";
import { NChartItemView } from "./NChartItemView.ts";
import { NChartItemData } from "./NChartItemData.ts";
import { SetupContext } from "vue";

export class NChartItemController extends ProtoController
{
    /**
     * @type {NChartItemController}
     */
    declare scope : NChartItemController;

    /**
     * @type {NChartItemData}
     */
    declare data : NChartItemData;

    /**
     * @type {NChartItemView}
     */
    declare view : NChartItemView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NChartItemView(this),
            new NChartItemData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        this.injectRef(['chart', 'NChart']);

        return this;
    }

    onMounted()
    {
        this.ncx('chart')?.append(this);
    }

    onUnmounted()
    {
        this.ncx('chart')?.remove(this);
    }

    toItem()
    {
        return {
            axis: this.data.axis,
            value: this.data.value,
            color: this.data.color,
            type: this.data.type,
        };
    }

}

export default NChartItemController;