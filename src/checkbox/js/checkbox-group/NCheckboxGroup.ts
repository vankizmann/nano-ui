import { PropType, defineComponent, getCurrentInstance } from "vue";
import { Obj } from "@kizmann/pico-js";
import { Props } from "../../../root/index.ts";
import { NCheckboxGroupController } from "./NCheckboxGroupController.ts";


export const NCheckboxGroupProps = {

    ...Props.Size,
    ...Props.Type,
    ...Props.AlignHorizontal,

    /**
     * @type {PropType<array>}
     */
    modelValue: {
        type: [Array], default: () => []
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NCheckboxGroup',

    /**
     * @type {typeof NCheckboxGroupProps}
     */
    props: NCheckboxGroupProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NCheckboxGroupController(props, context);

        ncx.pass({
            global: 'superGlobal',
            toggle: 'superToggle',
        });

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});