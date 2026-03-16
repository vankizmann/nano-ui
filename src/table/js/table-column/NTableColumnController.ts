import { onMounted, SetupContext } from "vue";
import { Arr, Mix, Num, Obj } from "@kizmann/pico-js";
import { ProtoController } from "../../../root/index.ts";
import { NTableColumnView } from "./NTableColumnView.ts";
import { NTableColumnData } from "./NTableColumnData.ts";

export class NTableColumnController extends ProtoController
{
    /**
     * @type {NTableColumnController}
     */
    declare scope : NTableColumnController;

    /**
     * @type {NTableColumnData}
     */
    declare data : NTableColumnData;

    /**
     * @type {NTableColumnView}
     */
    declare view : NTableColumnView;

    /**
     * @type {any}
     */
    plugin : any;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NTableColumnView(this),
            // @ts-ignore
            new NTableColumnData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        this.injectRef(['table', 'NTable']);

        this.makeLinkData('optionsMap', 'options', () => {
            return this.createOptionsMap();
        });

        const plugin = Obj.get(...[
            globalThis.NTablePlugins, this.data.type
        ]);

        if ( !Mix.isEmpty(plugin) ) {
            this.plugin = new plugin(this.ncx('table'), this);
        }

        return this;
    }

    onMounted()
    {
        this.ncx('table').append(this);
    }

    onUnmounted()
    {
        this.ncx('table').remove(this);
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

    getVisibility(width : number = 9999)
    {
        const { data } = this;

        if ( !data.visible ) {
            return false;
        }

        if ( !data.breakpoint ) {
            return true;
        }

        return Mix.num(data.breakpoint) > width;
    }

}

export default NTableColumnController;