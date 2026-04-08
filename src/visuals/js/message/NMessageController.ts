import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NMessageView } from "./NMessageView.ts";
import { NMessageData } from "./NMessageData.ts";
import { Run } from "@kizmann/pico-js";


export class NMessageController extends ProtoController
{
    /**
     * @type {NMessageController}
     */
    declare scope : NMessageController;

    /**
     * @type {NMessageData}
     */
    declare data: NMessageData;

    /**
     * @type {NMessageView}
     */
    declare view: NMessageView;

    /**
     * @type {ResizeObserver}
     */
    observer : ResizeObserver;

    /**
     * @type {boolean}
     */
    transition : boolean = false;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NMessageView(this),
            new NMessageData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeRef('el');
        this.cloneProp('modelValue');

        return this;
    }

    onMounted()
    {
        this.dom('el').on('transitionrun', () => {
            this.transition = true;
        });

        this.dom('el').on('transitionend', () => {
            Run.frame(() => this.transition = false);
        });

        this.observer = new ResizeObserver(() => {
            this.applyMaxHeight();
        });

        this.observer.observe(this.rel('el'))
    }

    onUnmounted()
    {
        this.observer.disconnect();
    }

    applyMaxHeight() : void
    {
        const height = this.dom('el').actual((el : any) => {
            return el.clientHeight;
        });

        if ( ! height || this.transition ) {
            return;
        }

        this.dom('el').style({
            '--n-message-height': height + 'px',
        });
    }

}

export default NMessageController;