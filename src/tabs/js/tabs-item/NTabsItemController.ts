import { provide, SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NTabsItemView } from "./NTabsItemView.ts";
import { NTabsItemData } from "./NTabsItemData.ts";
import { Arr, Mix } from "@kizmann/pico-js";


export class NTabsItemController extends ProtoController
{
    /**
     * @type {NTabsItemController}
     */
    declare scope : NTabsItemController;

    /**
     * @type {NTabsItemData}
     */
    declare data : NTabsItemData;

    /**
     * @type {NTabsItemView}
     */
    declare view : NTabsItemView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NTabsItemView(this),
            new NTabsItemData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        this
            .makeData('init')
            .cloneProp('scrollbar')
            .cloneProp('lazy')
            .cloneProp('keep');

        provide('NTabsItem', this.instance);

        this.injectRef([
            'tabs', 'NTabs'
        ]);

        const tabs = this.ncx('tabs');

        if ( this.data.scrollbar === null ) {
            this.set('scrollbar', tabs.data.scrollbar);
        }

        if ( this.data.lazy === null ) {
            this.set('lazy', tabs.data.lazy);
        }

        if ( this.data.keep === null ) {
            this.set('keep', tabs.data.keep);
        }

        return this;
    }

    onMounted()
    {
        this.ncx('tabs')?.append(this);
    }

    onUnmounted()
    {
        this.ncx('tabs')?.remove(this);
    }

    superToggle() : void
    {
        this.ncx('tabs')?.superToggle(this.data.name);
    }

    isActive() : boolean
    {
        const [{ data }, tabs] = [
            this, this.ncx('tabs')
        ];

        if ( Mix.isEmpty(data.name) ) {
            return false;
        }

        if ( ! data.lazy || (data.keep && data.init) ) {
            return true;
        }


        return Arr.has(tabs.data.value, data.name);
    }

    isVisible() : boolean
    {
        const [{ data }, tabs] = [
            this, this.ncx('tabs')
        ];

        if ( Mix.isEmpty(data.name) ) {
            return false;
        }

        return Arr.has(tabs.data.value, data.name);
    }

}

export default NTabsItemController;