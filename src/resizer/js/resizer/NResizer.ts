import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NResizerController } from "./NResizerController.ts";

export const NResizerProps = {

    ...Props.Disabled,
    ...Props.Type,

    /**
     * @type {PropType<number>}
     */
    modelValue: {
        type: [Number], default: null
    },

    /**
     * @type {PropType<number>}
     */
    width: {
        type: [Number], default: null
    },

    /**
     * @type {PropType<number>}
     */
    minWidth: {
        type: [Number], default: 40
    },

    /**
     * @type {PropType<number>}
     */
    maxWidth: {
        type: [Number], default: null
    },

    /**
     * @type {PropType<array>}
     */
    group: {
        type: [Array], default: null
    },

    /**
     * @type {PropType<string>}
     */
    flex: {
        type: [String], default: ''
    },

    /**
     * @type {PropType<string>}
     */
    direction: {
        type: [String], default: 'right'
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NResizer',

    /**
     * @type {typeof NResizerProps}
     */
    props: NResizerProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
        'update:width',
    ],

    setup(props, context)
    {
        let ncx = new NResizerController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});