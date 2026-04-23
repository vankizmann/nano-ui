import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NRadioController } from "./NRadioController.ts";

export const NRadioProps = {

    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,

    /**
     * @type {PropType<null|string>}
     */
    value: {
        type: [String], default: 'undefined'
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
    name: 'NRadio',

    /**
     * @type {typeof NRadioProps}
     */
    props: NRadioProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NRadioController(props, context);

        ncx.pass({
            apply: 'superApply'
        });

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});