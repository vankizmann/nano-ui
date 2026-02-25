import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NRadioGroupController } from "./NRadioGroupController.js";

export const NRadioGroupProps = PropMerge([
    Props.Size,
    Props.Type,
    Props.Disabled,
    Props.AlignHorizontal,
], {

    /**
     * @type {PropType<string|number>}
     */
    modelValue: {
        type: [String,Number], default: ''
    },

});

export default defineComponent({

    name: 'NRadioGroup',

    props: NRadioGroupProps,

    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NRadioGroupController(props, context);

        ncx.pass([
            'apply'
        ]);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});