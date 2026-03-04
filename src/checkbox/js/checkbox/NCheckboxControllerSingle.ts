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
        this.ncx('group')?.append(this);
    }

    onUnmounted()
    {
        this.ncx('group')?.remove(this);
    }

    watchModel()
    {
        const group = this.ncx('group');

        const fn = () => {
            this.updateModel();
        };

        group.watchProp('modelValue', fn);
    }

    updateModel()
    {
        const group = this.ncx('group');

        const value = Arr.has(...[
            group.data.model, this.data.value
        ]);

        this.set('modelValue', value);
    }

    superToggle()
    {
        const group = this.ncx('group');

        if ( group ) {
            group.superToggle(this);
        }

        this.update('modelValue', !this.data.model);
    }

}

export default NCheckboxController;