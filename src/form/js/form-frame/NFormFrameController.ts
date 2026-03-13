import { provide, SetupContext } from "vue";
import { GroupController } from "../../../root/index.ts";
import { NFormFrameView } from "./NFormFrameView.ts";
import { NFormFrameData } from "./NFormFrameData.ts";
import NFormGroupController from "../form-group/NFormGroupController.ts";
import { Run } from "@kizmann/pico-js";


export class NFormFrameController extends GroupController
{
    /**
     * @type {NFormFrameController}
     */
    declare scope : NFormFrameController;

    /**
     * @type {NFormFrameData}
     */
    declare data: NFormFrameData;

    /**
     * @type {NFormFrameView}
     */
    declare view: NFormFrameView;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NFormFrameView(this),
            new NFormFrameData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeRef('body');

        provide('NFormFrame', this.instance);

        return this;
    }

    superView(group : NFormGroupController)
    {
        const selector = `[data-ncx="${group.uid}"]`;

        const options = {
            behavior: 'smooth'
        };

        Run.frame(() => {
            this.ncx('body')?.scrollTo(selector, options);
        });

        group.superView();
    }

}

export default NFormFrameController;