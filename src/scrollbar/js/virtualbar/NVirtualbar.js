import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NVirtualbarController } from "./NVirtualbarController.js";

export const NVirtualbarProps = PropMerge([
    //
], {

    /**
     * @type {PropType<array>}
     */
    items: {
        type: [Array], default: () => []
    },

    /**
     * @type {PropType<boolean>}
     */
    grid: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<number>}
     */
    threshold: {
        type: [Number], default: 101
    },

    /**
     * @type {PropType<number>}
     */
    itemHeight: {
        type: [Number], default: 34
    },

    /**
     * @type {PropType<number>}
     */
    itemWidth: {
        type: [Number], default: 120
    },

    /**
     * @type {PropType<boolean>}
     */
    rawMode: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    overflowX: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<boolean>}
     */
    overflowY: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<string>}
     */
    wrapClass: {
        type: [String], default: ':bem__wrap'
    },

    /**
     * @type {PropType<boolean>}
     */
    scrollPortal: {
        type: [Boolean], default: false
    },

});

export default defineComponent({

    name: 'NVirtualbar',

    props: NVirtualbarProps,

    emits: [
        'ready',
        'scroll',
    ],

    setup(props, context)
    {
        let ncx = new NVirtualbarController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});