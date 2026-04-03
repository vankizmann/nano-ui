import { SetupContext } from "vue";
import { Arr } from "@kizmann/pico-js";
import { ProtoController } from "../../../root/index.ts";
import { NSwitchView } from "./NSwitchView.ts";
import { NSwitchData } from "./NSwitchData.ts";

export class NSwitchController extends ProtoController
{
    /**
     * @type {NSwitchController}
     */
    declare scope : NSwitchController;

    /**
     * @type {NSwitchData}
     */
    declare data : NSwitchData;

    /**
     * @type {NSwitchView}
     */
    declare view : NSwitchView;

    constructor(props : any, context : SetupContext)
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

        this.cloneProp('modelValue');

        this.resetValue();

        return this;
    }

    resetValue()
    {
        const { data } = this;

        if ( data.model === data.onValue ) {
            return;
        }

        if ( data.model === data.offValue ) {
            return;
        }

        this.set('modelValue', data.offValue);
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

        if ( !Arr.has(both, value) ) {
            value = this.data.onValue;
        }

        this.update('modelValue', value);
    }

}

export default NSwitchController;