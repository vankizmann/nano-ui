import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NResizerController } from "./NResizerController.js";

export const NResizerProps = PropMerge([
    Props.Disabled,
    Props.Type,
], {

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

});

export default defineComponent({

    name: 'NResizer',

    props: NResizerProps,

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