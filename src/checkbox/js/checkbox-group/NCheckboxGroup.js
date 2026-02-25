import { PropType, defineComponent, getCurrentInstance } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NCheckboxGroupController } from "./NCheckboxGroupController.js";
import { Obj } from "@kizmann/pico-js";

export const NCheckboxGroupProps = PropMerge([
    Props.Size,
    Props.Type,
    Props.Disabled,
    Props.AlignHorizontal,
], {

    /**
     * @type {PropType<array>}
     */
    modelValue: {
        type: [Array], default: () => []
    },

});

export default defineComponent({

    name: 'NCheckboxGroup',

    props: NCheckboxGroupProps,

    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NCheckboxGroupController(props, context);

        ncx.pass([
            'toggle', 'global'
        ]);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});