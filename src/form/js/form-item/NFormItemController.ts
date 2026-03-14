import { ProtoController } from "../../../root/index.ts";
import { NFormItemView } from "./NFormItemView.ts";
import { NFormItemData } from "./NFormItemData.ts";
import { provide, SetupContext } from "vue";
import { Run } from "@kizmann/pico-js";

export class NFormItemController extends ProtoController
{
    /**
     * @type {NFormItemController}
     */
    declare scope : NFormItemController;

    /**
     * @type {NFormItemData}
     */
    declare data : NFormItemData;

    /**
     * @type {NFormItemView}
     */
    declare view : NFormItemView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NFormItemView(this),
            new NFormItemData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        this.cloneProp('modelValue');
        this.makeRef('el');

        if ( ! this.data.conditional ) {
            this.set('modelValue', true);
        }

        this.injectRef(['form', 'NForm']);
        this.injectRef(['form-group', 'NFormGroup']);
        this.injectRef(['tabs-item', 'NTabsItem']);
        this.injectRef(['collapse-item', 'NCollapseItem']);

        provide('NFormItem', this.instance);

        return this;
    }

    onMounted()
    {
        this.ncx('form')?.append(this);
        this.ncx('form-group')?.append(this);
    }

    onUnmounted()
    {
        this.ncx('form')?.remove(this);
        this.ncx('form-group')?.remove(this);
    }

    superToggle()
    {
        if ( this.data.conditional ) {
            this.update('modelValue', !this.data.model);
        }
    }

    superView()
    {
        this.ncx('tabs-item')?.superOpen();
        this.ncx('collapse-item')?.superOpen();
        this.ncx('form-group')?.superOpen();

        const options: any = {
            behavior: 'smooth'
        };

        Run.frame(() => {
            this.el.scrollIntoView(options);
        });
    }

}

export default NFormItemController;