import { SetupContext } from "vue";
import { Mix } from "@kizmann/pico-js";
import { ProtoController } from "../../../root/index.ts";
import { NInputNumberData } from "./NInputNumberData.ts";
import { NInputNumberView } from "./NInputNumberView.ts";


export class NInputNumberController extends ProtoController
{
    /**
     * @type {NInputNumberController}
     */
    declare scope : NInputNumberController;

    /**
     * @type {NInputNumberData}
     */
    declare data : NInputNumberData;

    /**
     * @type {NInputNumberView}
     */
    declare view : NInputNumberView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NInputNumberView(this),
            new NInputNumberData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .cloneProp('modelValue');

        this
            .makeData('focus')
            .makeRef('input');

        return this;
    }

    applyFormat(input : string) : void
    {
        const { data } = this;

        if ( input === '' ) {
            return;
        }

        const match = input.match(...[
            /[0-9]+([.,][0-9]+)?/
        ]);

        let value = data.model;

        if ( match && data.precision > 0 ) {
            value = Mix.num(match[0]);
        }

        if ( match && data.precision < 1 ) {
            value = Mix.int(match[0]);
        }

        if ( value < this.data.min ) {
            value = this.data.min;
        }

        if ( value > this.data.max ) {
            value = this.data.max;
        }

        if ( Mix.isNum(value) ) {
            this.update('modelValue', value);
        }
    }

    decreaseNumber() : void
    {
        let value = this.data.model;

        if ( !Mix.isNum(value) ) {
            value = this.data.min;
        }

        value -= 1;

        if ( value < this.data.min ) {
            value = this.data.min;
        }

        if ( value > this.data.max ) {
            value = this.data.max;
        }

        this.update('modelValue', value);
    }

    increaseNumber() : void
    {
        let value = this.data.model;

        value += 1;

        if ( value < this.data.min ) {
            value = this.data.min;
        }

        if ( value > this.data.max ) {
            value = this.data.max;
        }

        this.update('modelValue', value);
    }

}

export default NInputNumberController;