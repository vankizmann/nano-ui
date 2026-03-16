import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NSliderController } from "./NSliderController.ts";

export const NSliderProps = {

    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,

    /**
     * @type {PropType<string|number|array>}
     */
    modelValue: {
        type: [String,Number,Array], default: null
    },

    /**
     * @type {PropType<boolean>}
     */
    range: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<array>}
     */
    labels: {
        type: [Array], default: () => []
    },

    /**
     * @type {PropType<number|array>}
     */
    steps: {
        type: [Number,Array], default: 1
    },

    /**
     * @type {PropType<number>}
     */
    min: {
        type: [Number], default: 0
    },

    /**
     * @type {PropType<number>}
     */
    max: {
        type: [Number], default: 100
    },


};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NSlider',

    /**
     * @type {typeof NSliderProps}
     */
    props: NSliderProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NSliderController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});