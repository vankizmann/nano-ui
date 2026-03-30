import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NTransferView } from "./NTransferView.ts";
import { NTransferData } from "./NTransferData.ts";
import { Arr, Mix, Obj, Str } from "@kizmann/pico-js";


export class NTransferController extends ProtoController
{
    /**
     * @type {NTransferController}
     */
    declare scope : NTransferController;

    /**
     * @type {NTransferData}
     */
    declare data : NTransferData;

    /**
     * @type {NTransferView}
     */
    declare view : NTransferView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NTransferView(this),
            new NTransferData(this),
        ];

        if ( this.constructor.name === 'NTransferController' ) {
            this.setup();
        }
    }

    setup()
    {
        super.setup();

        this.makeUID();

        this
            .makeRef('source')
            .makeRef('target');

        this.cloneProp('modelValue');

        this
            .makeData('source')
            .makeData('sourceSearch', '')
            .makeData('target')
            .makeData('targetSearch', '');

        this.watchData('modelValue', () => {
            this.updateSource();
            this.updateTarget();
        });

        this.watchProp('options', () => {
            this.updateSource();
            this.updateTarget();
        });

        this.watchData('sourceSearch', () => {
            this.updateSource();
        });

        this.watchData('targetSearch', () => {
            this.updateTarget();
        });

        this.updateSource();
        this.updateTarget();

        return this;
    }

    updateSource()
    {
        const { data } = this.scope;

        const [search, unique, label] = [
            data.sourceSearch, data.uniqueProp, data.labelProp
        ];

        let uniques = Arr.each(data.model || [], (item : any) => {
            return Obj.get(item, unique);
        });

        const sources = Arr.filter(data.options, (item : any) => {
            return !Arr.has(uniques, item[unique]);
        });

        const options = Arr.filter(sources, (item : any) => {
            return Str.has(Obj.get(item, label), search);
        });

        this.set('source', Arr.sort(options, label));
    }

    updateTarget()
    {
        const { data } = this.scope;

        const [search, label] = [
            data.targetSearch, data.labelProp
        ];

        const options = Arr.filter(data.model || [], (item : any) => {
            return Str.has(Obj.get(item, label), search);
        });

        this.set('target', Arr.sort(options, label));
    }

    moveToSource(item : any)
    {
        const { uniqueProp } = this.data;

        const result = Arr.clone(...[
            this.data.model || []
        ]);

        Arr.remove(result, item, {
            [uniqueProp]: Obj.get(item, uniqueProp)
        });

        this.update('modelValue', result);
    }

    moveToTarget(item : any)
    {
        const { uniqueProp } = this.data;

        const result = Arr.clone(...[
            this.data.model || []
        ]);

        Arr.add(result, item, {
            [uniqueProp]: Obj.get(item, uniqueProp)
        });

        this.update('modelValue', result);
    }

    moveSelectedToSource()
    {
        const { selected } = this.ncx('target').data;

        const result = Arr.clone(...[
            this.data.model || []
        ]);

        const { uniqueProp } = this.data;

        const items = Arr.filter(result, (item : any) => {
            return !Arr.has(selected, item[uniqueProp]);
        });

        this.update('modelValue', items);

    }

    moveSelectedToTarget()
    {
        const { selected } = this.ncx('source').data;

        const result = Arr.clone(...[
            this.data.model || []
        ]);

        const { uniqueProp } = this.data;

        const items = Arr.each(selected, (uid : string) => {
            return Arr.find(this.data.options, { [uniqueProp]: uid });
        });

        Arr.append(...[
            result, ...Arr.filter(items)
        ]);

        this.update('modelValue', result);
    }

}

export default NTransferController;