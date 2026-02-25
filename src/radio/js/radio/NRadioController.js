import { ProtoController } from "../../../root/index.js";
import { NRadioProps } from "./NRadio.js";
import { NRadioView } from "./NRadioView.jsx";
import { NRadioData } from "./NRadioData.js";
import { onMounted, onUnmounted } from "vue";

/**
 * @class NRadioController
 * @extends {BaseController<NRadioController, NRadioProps, NRadioView, NRadioData>}
 */
export class NRadioController extends ProtoController
{

    constructor(props, context)
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

        if ( ! group ) {
            throw new Error('NRadioGroup is required in radio!');
        }

        this.linkProp('modelValue', group);

        onMounted(() => {
            this.onMounted(group);
        });

        onUnmounted(() => {
            this.onUnmounted(group);
        });

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

    apply()
    {
        this.ref('group')?.ncx.apply(this);
    }

}

export default NRadioController;