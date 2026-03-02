import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NPopoverOptionView } from "./NPopoverOptionView.ts";
import { NPopoverOptionData } from "./NPopoverOptionData.ts";

export class NPopoverOptionController extends ProtoController
{
    /**
     * @type {NPopoverOptionController}
     */
    declare scope : NPopoverOptionController;

    /**
     * @type {NPopoverOptionData}
     */
    declare data : NPopoverOptionData;

    /**
     * @type {NPopoverOptionView}
     */
    declare view : NPopoverOptionView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NPopoverOptionView(this),
            new NPopoverOptionData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.injectRef([
            'popover', 'NPopover'
        ]);

        return this;
    }

    onClick(e : any)
    {
        const popover = this.ref('popover');

        if ( popover && this.get('clickClose') ) {
            popover.ncx.superClose(true);
        }

        this.emit('click', e);
    }

    onDblclick(e : any)
    {
        const popover = this.ref('popover');

        if ( popover && this.get('clickClose') ) {
            popover.ncx.superClose(true);
        }

        this.emit('dblclick', e);
    }

}

export default NPopoverOptionController;