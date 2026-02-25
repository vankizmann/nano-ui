import { Arr } from "@kizmann/pico-js";
import { NCheckboxProps } from "./NCheckbox.js";
import { NCheckboxView } from "./NCheckboxView.jsx";
import { NCheckboxData } from "./NCheckboxData.js";
import { NCheckboxController } from "./NCheckboxController.js";

/**
 * @class NCheckboxControllerSingle
 * @extends {NCheckboxController<NCheckboxController, NCheckboxProps, NCheckboxView, NCheckboxData>}
 */
export class NCheckboxControllerSingle extends NCheckboxController
{

    setup()
    {
        super.setup()

        this
            .cloneProp('modelValue')
            .linkProp('value');

        if ( this.ref('group') ) {
            this.watchModel();
            this.updateModel();
        }

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

    watchModel()
    {
        const group = this.ref('group');

        const fn = () => {
            this.updateModel();
        };

        group?.ncx.watchProp('modelValue', fn);
    }

    updateModel()
    {
        const group = this.ref('group');

        const value = Arr.has(...[
            group?.ncx.data.model, this.data.value
        ]);

        this.set('modelValue', value);
    }

    toggle()
    {
        const group = this.ref('group');

        if ( group ) {
            group.ncx.toggle(this);
        }

        this.data.model = !this.data.model;
    }

}

export default NCheckboxController;