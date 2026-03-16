import { ProtoController } from "../../../root/index.ts";
import { NInfoColumnView } from "./NInfoColumnView.ts";
import { NInfoColumnData } from "./NInfoColumnData.ts";
import { SetupContext } from "vue";
import { Arr, Mix, Obj } from "@kizmann/pico-js";

export class NInfoColumnController extends ProtoController
{
    /**
     * @type {NInfoColumnController}
     */
    declare scope : NInfoColumnController;

    /**
     * @type {NInfoColumnData}
     */
    declare data : NInfoColumnData;

    /**
     * @type {NInfoColumnView}
     */
    declare view : NInfoColumnView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NInfoColumnView(this),
            new NInfoColumnData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        this.injectRef(['info', 'NInfo']);

        this.makeLinkData('optionsMap', 'options', () => {
            return this.createOptionsMap();
        });

        return this;
    }

    onMounted()
    {
        this.ncx('info')?.append(this);
    }

    onUnmounted()
    {
        this.ncx('info')?.remove(this);
    }

    createOptionsMap()
    {
        let options = this.data.options;

        if ( Mix.isFunc(options) ) {
            options = options(this);
        }

        const result = Arr.each(options, (value : any, index : any) => {
            return { $value: value, $index: index };
        });

        return Object.freeze(result);
    }

    getOptions()
    {
        const { data } = this;

        const result = Arr.each(data.optionsMap, (item : any) => {
            return {
                label: Obj.get(item, data.optionsLabel),
                value: Obj.get(item, data.optionsValue),
            };
        });

        return Object.freeze(result);
    }

    getOption(value : any)
    {
        const { data } = this;

        let option = Arr.find(data.optionsMap, (item : any) => {
            return Obj.get(item, data.optionsValue) == value;
        });

        return Obj.get(option, data.optionsLabel);
    }

}

export default NInfoColumnController;