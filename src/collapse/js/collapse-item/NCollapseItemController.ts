import { provide, SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NCollapseItemView } from "./NCollapseItemView.ts";
import { NCollapseItemData } from "./NCollapseItemData.ts";
import { Arr, Mix } from "@kizmann/pico-js";


export class NCollapseItemController extends ProtoController
{
    /**
     * @type {NCollapseItemController}
     */
    declare scope : NCollapseItemController;

    /**
     * @type {NCollapseItemData}
     */
    declare data : NCollapseItemData;

    /**
     * @type {NCollapseItemView}
     */
    declare view : NCollapseItemView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NCollapseItemView(this),
            new NCollapseItemData(this),
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

        provide('NCollapseItem', this.instance);

        this.injectRef([
            'collapse', 'NCollapse'
        ]);

        const collapse = this.ncx('collapse');

        if ( this.data.scrollbar === null ) {
            this.set('scrollbar', collapse.data.scrollbar);
        }

        if ( this.data.lazy === null ) {
            this.set('lazy', collapse.data.lazy);
        }

        if ( this.data.keep === null ) {
            this.set('keep', collapse.data.keep);
        }

        return this;
    }

    onMounted()
    {
        this.ncx('collapse')?.append(this);
    }

    onUnmounted()
    {
        this.ncx('collapse')?.remove(this);
    }

    isActive() : boolean
    {
        const [{ data }, collapse] = [
            this, this.ncx('collapse')
        ];

        if ( Mix.isEmpty(data.name) ) {
            return false;
        }

        if ( ! data.lazy || (data.keep && data.init) ) {
            return true;
        }

        return Arr.has(collapse?.data.model, data.name);
    }

    isVisible() : boolean
    {
        const [{ data }, collapse] = [
            this, this.ncx('collapse')
        ];

        if ( Mix.isEmpty(data.name) ) {
            return false;
        }

        return Arr.has(collapse?.data.model, data.name);
    }

    superToggle()
    {
        if ( ! this.isVisible() ) {
            this.ncx('collapse')?.superToggle(this.data.name);
        }
    }

}

export default NCollapseItemController;