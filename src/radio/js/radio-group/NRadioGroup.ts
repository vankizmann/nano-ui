import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NRadioGroupController } from "./NRadioGroupController.ts";

export const NRadioGroupProps = {

    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,
    ...Props.AlignHorizontal,

    /**
     * @type {PropType<string|number>}
     */
    modelValue: {
        type: [String,Number], default: ''
    },

    /**
     * @type {PropType<string>}
     */
    view: {
        type: [String], default: 'checkbox'
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NRadioGroup',

    /**
     * @type {typeof NRadioGroupProps}
     */
    props: NRadioGroupProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NRadioGroupController(props, context);

        ncx.pass({
            apply: 'superApply'
        });

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});