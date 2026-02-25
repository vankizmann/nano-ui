import { ProtoController } from "../../../root/index.js";
import { NInputNumberProps } from "./NInputNumber.js";
import { NInputNumberData } from "./NInputNumberData.js";
import { NInputNumberView } from "./NInputNumberView.jsx";
import { Mix } from "@kizmann/pico-js";

/**
 * @class NInputNumberController
 * @extends {BaseController<NInputNumberController, NInputNumberProps, NInputNumberView, NInputNumberData>}
 */
export class NInputNumberController extends ProtoController
{

    constructor(props, context)
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
            .cloneProp('modelValue')
            .linkProp('clearValue')
            .linkProp('load')
            .linkProp('type')
            .linkProp('size')
            .linkProp('disabled')
            .linkProp('clearable')
            .linkProp('min')
            .linkProp('max')
            .linkProp('stepSize')
            .linkProp('precision')
            .linkProp('format')
            .linkProp('placeholder');

        this
            .makeData('focus')
            .makeRef('input');

        return this;
    }

    applyFormat(input)
    {
        const { data } = this.unpack();

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

    decreaseNumber()
    {
        let value = this.data.model;

        if ( ! Mix.isNum(value) ) {
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

    increaseNumber()
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