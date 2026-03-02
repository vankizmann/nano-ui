import { Arr } from "@kizmann/pico-js";
import { NCheckboxController } from "./NCheckboxController.ts";

export class NCheckboxControllerSingle extends NCheckboxController
{
    /**
     * @type {NCheckboxControllerSingle}
     */
    declare scope : NCheckboxControllerSingle;

    setup()
    {
        super.setup()

        this.cloneProp('modelValue');

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

    superToggle()
    {
        const group = this.ref('group');

        if ( group ) {
            group.ncx.superToggle(this);
        }

        this.update('modelValue', !this.data.model);
    }

}

export default NCheckboxController;