import { Arr } from "@kizmann/pico-js";
import { NCheckboxProps } from "./NCheckbox.js";
import { NCheckboxView } from "./NCheckboxView.jsx";
import { NCheckboxData } from "./NCheckboxData.js";
import { NCheckboxController } from "./NCheckboxController.js";


/**
 * @class NCheckboxController
 * @extends {ProtoController<NCheckboxController, NCheckboxProps, NCheckboxView, NCheckboxData>}
 */
export class NCheckboxControllerGlobal extends NCheckboxController
{

    setup()
    {
        super.setup()

        const group = this.ref('group');

        if ( ! group ) {
            throw new Error('NCheckboxGroup is required on global!');
        }

        this
            .linkProp(['modelValue', 'allchecked'], group)
            .linkProp('intermediate', group);

        return this;
    }

    toggle()
    {
        this.ref('group')?.ncx.global();
    }

}

export default NCheckboxController;