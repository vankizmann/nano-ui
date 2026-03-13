import { provide, SetupContext } from "vue";
import { GroupController } from "../../../root/index.ts";
import { NFormGroupView } from "./NFormGroupView.ts";
import { NFormGroupData } from "./NFormGroupData.ts";
import { Run } from "@kizmann/pico-js";

export class NFormGroupController extends GroupController
{
    /**
     * @type {NFormGroupController}
     */
    declare scope : NFormGroupController;

    /**
     * @type {NFormGroupData}
     */
    declare data: NFormGroupData;

    /**
     * @type {NFormGroupView}
     */
    declare view: NFormGroupView;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NFormGroupView(this),
            new NFormGroupData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        this.cloneProp('modelValue');
        this.makeRef('el');

        this.injectRef(['form', 'NForm']);
        this.injectRef(['form-frame', 'NFormFrame']);
        this.injectRef(['tabs-item', 'NTabsItem']);
        this.injectRef(['collapse-item', 'NCollapseItem']);

        provide('NFormGroup', this.instance);

        return this;
    }

    onMounted()
    {
        this.ncx('form-frame')?.append(this);
    }

    onUnmounted()
    {
        this.ncx('form-frame')?.remove(this);
    }

    superToggle()
    {
        if ( this.data.collapse ) {
            this.update('modelValue', !this.data.model);
        }
    }

    superView()
    {
        this.ncx('tabs-item')?.superToggle();
        this.ncx('collapse-item')?.superToggle();

        const options: any = {
            behavior: 'smooth'
        };

        Run.frame(() => {
            this.el.scrollIntoView(options);
        });
    }

}

export default NFormGroupController;