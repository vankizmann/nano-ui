import { NCheckboxController } from "./NCheckboxController.ts";


export class NCheckboxControllerGlobal extends NCheckboxController
{
    /**
     * @type {NCheckboxControllerGlobal}
     */
    declare scope : NCheckboxControllerGlobal;

    setup()
    {
        super.setup()

        const group = this.ref('group');

        if ( !group ) {
            throw new Error('NCheckboxGroup is required on global!');
        }

        this
            .linkProp(['modelValue', 'checked'], group)
            .linkProp('intermediate', group);

        return this;
    }

    superToggle()
    {
        this.ref('group')?.ncx.superGlobal();
    }

}

export default NCheckboxController;