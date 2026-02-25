import { ProtoController } from "../../../root/index.js";
import { NSwitchProps } from "./NSwitch.js";
import { NSwitchView } from "./NSwitchView.jsx";
import { NSwitchData } from "./NSwitchData.js";
import { Arr } from "@kizmann/pico-js";

/**
 * @class NSwitchController
 * @extends {BaseController<NSwitchController, NSwitchProps, NSwitchView, NSwitchData>}
 */
export class NSwitchController extends ProtoController
{

    constructor(props, context)
    {
        super(props, context);

        [this.view, this.data] = [
            new NSwitchView(this),
            new NSwitchData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .cloneProp('modelValue')
            .linkProp('size')
            .linkProp('disabled')
            .linkProp('onType')
            .linkProp('offType')
            .linkProp('onValue')
            .linkProp('offValue');

        return this;
    }

    toggle()
    {
        let value = this.data.model;

        if ( this.data.model === this.data.onValue ) {
            value = this.data.offValue;
        }

        if ( this.data.model === this.data.offValue ) {
            value = this.data.onValue;
        }

        const both = [
            this.data.onValue, this.data.offValue
        ];

        if ( ! Arr.has(both, value) ) {
            value = this.data.onValue;
        }

        this.update('modelValue', value);
    }

}

export default NSwitchController;