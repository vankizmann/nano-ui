import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NRadioController } from "./NRadioController.js";

export const NRadioProps = PropMerge([
    Props.Size,
    Props.Type,
    Props.Disabled,
], {

    /**
     * @type {PropType<null|string>}
     */
    value: {
        type: [String], default: 'undefined'
    },

});

export default defineComponent({

    name: 'NRadio',

    props: NRadioProps,

    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NRadioController(props, context);

        ncx.pass([
            'apply'
        ]);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});