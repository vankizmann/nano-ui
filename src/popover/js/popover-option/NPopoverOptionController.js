import { ProtoController } from "../../../root/index.js";
import { NPopoverOptionProps } from "./NPopoverOption.js";
import { NPopoverOptionView } from "./NPopoverOptionView.jsx";
import { NPopoverOptionData } from "./NPopoverOptionData.js";

/**
 * @class NPopoverOptionController
 * @extends {BaseController<NPopoverOptionController, NPopoverOptionProps, NPopoverOptionView, NPopoverOptionData>}
 */
export class NPopoverOptionController extends ProtoController
{

    constructor(props, context)
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

        this
            .linkProp('disabled')
            .linkProp('icon')
            .linkProp('iconPosition')
            .linkProp('focus')
            .linkProp('active')
            .linkProp('clickClose');

        return this;
    }

    onClick(e)
    {
        const popover = this.ref('popover');

        if ( popover && this.get('clickClose') ) {
            popover.ncx.popel.close();
        }

        this.emit('click', e);
    }

    onDblclick(e)
    {
        const popover = this.ref('popover');

        if ( popover && this.get('clickClose') ) {
            popover.ncx.popel.close();
        }

        this.emit('dblclick', e);
    }

}

export default NPopoverOptionController;