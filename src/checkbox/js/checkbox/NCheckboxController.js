import { ProtoController } from "../../../root/index.js";
import { NCheckboxProps } from "./NCheckbox.js";
import { NCheckboxView } from "./NCheckboxView.jsx";
import { NCheckboxData } from "./NCheckboxData.js";
import { computed, onBeforeUnmount, onMounted, onUnmounted, watch } from "vue";
import { Arr } from "@kizmann/pico-js";

/**
 * @class NCheckboxController
 * @extends {BaseController<NCheckboxController, NCheckboxProps, NCheckboxView, NCheckboxData>}
 */
export class NCheckboxController extends ProtoController
{

    constructor(props, context)
    {
        super(props, context);

        [this.view, this.data] = [
            new NCheckboxView(this),
            new NCheckboxData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        const group = this.injectRef([
            'group', 'NCheckboxGroup'
        ]);

        this
            .linkProp('type')
            .linkProp('size')
            .linkProp('disabled')
            .linkProp('allowUncheck');

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
        //
    }

    onUnmounted()
    {
        //
    }

    toggle()
    {
        //
    }

}

export default NCheckboxController;