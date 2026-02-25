import { ProtoController } from "../../../root/index.js";
import { NTableColumnProps } from "./NTableColumn.js";
import { NTableColumnView } from "./NTableColumnView.jsx";
import { NTableColumnData } from "./NTableColumnData.js";
import { onMounted } from "vue";
import { Arr, Mix, Num, Obj } from "@kizmann/pico-js";

/**
 * @class NTableColumnController
 * @extends {BaseController<NTableColumnController, NTableColumnProps, NTableColumnView, NTableColumnData>}
 */
export class NTableColumnController extends ProtoController
{
    plugin;

    constructor(props, context)
    {
        super(props, context);

        [this.view, this.data] = [
            new NTableColumnView(this),
            new NTableColumnData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        this
            .linkProp('modelValue')
            .linkProp('data')
            .linkProp('type')
            .linkProp('label')
            .linkProp('prop')
            .linkProp('sortProp')
            .linkProp('filterProp')
            .linkProp('sort')
            .linkProp('filter')
            .linkProp('visible')
            .linkProp('breakpoint')
            .linkProp('align')
            .linkProp('width')
            .linkProp('fixedWidth')
            .linkProp('minWidth')
            .linkProp('maxWidth')
            .linkProp('disabled')
            .linkProp('options')
            .linkProp('optionsLabel')
            .linkProp('optionsValue')
            .linkProp('datetimeFormat')
            .linkProp('trueText')
            .linkProp('falseText')
            .linkProp('emptyText')
            .linkProp('undefinedText');

        this.injectRef(['table', 'NTable']);

        this.makeLinkData('optionsMap', 'options', () => {
            return this.createOptionsMap();
        });

        onMounted(() => {
            this.onMounted();
        });

        const plugin = Obj.get(...[
            globalThis.NTablePlugins, this.data.type
        ]);

        if ( ! Mix.isEmpty(plugin) ) {
            this.plugin = new plugin(this.ref('table')?.ncx, this);
        }

        return this;
    }

    onMounted()
    {
        this.ref('table')?.ncx.append(this);
    }

    onUnmounted()
    {
        this.ref('table')?.ncx.remove(this);
    }

    createOptionsMap()
    {
        let options = this.data.options;

        if ( Mix.isFunc(options) ) {
            options = options(this);
        }

        const result = Arr.each(options, (value, index) => {
            return { $value: value, $index: index };
        });

        return Object.freeze(result);
    }

    getOptions()
    {
        const { data } = this.unpack();

        const result = Arr.each(data.optionsMap, (item) => {
            return {
                label: Obj.get(item, data.optionsLabel),
                value: Obj.get(item, data.optionsValue),
            };
        });

        return Object.freeze(result);
    }

    getOption(value)
    {
        const { data } = this.unpack();

        let option = Arr.find(data.optionsMap, (item) => {
            return Obj.get(item, data.optionsValue) == value;
        });

        return Obj.get(option, data.optionsLabel);
    }

    getVisibility(width = 9999999)
    {
        const { data } = this.unpack();

        if ( ! data.visible ) {
            return false;
        }

        if ( ! data.breakpoint ) {
            return true;
        }

        return Mix.num(data.breakpoint) > width;
    }

}

export default NTableColumnController;