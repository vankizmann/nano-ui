import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NScrollbarController } from "./NScrollbarController.js";

export const NScrollbarProps = PropMerge([
    //
], {

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

});

export default defineComponent({

    name: 'NScrollbar',

    props: NScrollbarProps,

    emits: [
        'ready',
        'scroll',
    ],

    setup(props, context)
    {
        let ncx = new NScrollbarController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});