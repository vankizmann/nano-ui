import { onMounted, onUnmounted, SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NRadioView } from "./NRadioView.ts";
import { NRadioData } from "./NRadioData.ts";

export class NRadioController extends ProtoController
{
    /**
     * @type {NRadioController}
     */
    declare scope : NRadioController;

    /**
     * @type {NRadioData}
     */
    declare data : NRadioData;

    /**
     * @type {NRadioView}
     */
    declare view : NRadioView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NRadioView(this),
            new NRadioData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        const group = this.injectRef([
            'group', 'NRadioGroup'
        ]);

        if ( !group ) {
            throw new Error('NRadioGroup is required in radio!');
        }

        this.linkProp('modelValue', group);

        return this;
    }

    onMounted()
    {
        this.ref('group')?.ncx.append(this);
    }

    onUnmounted()
    {
        this.ref('group')?.ncx.remove(this);
    }

    superApply()
    {
        this.ref('group')?.ncx.superApply(this);
    }

}

export default NRadioController;