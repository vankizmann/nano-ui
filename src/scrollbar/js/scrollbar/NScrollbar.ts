import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NScrollbarController } from "./NScrollbarController.ts";

export const NScrollbarProps = {

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

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NScrollbar',

    /**
     * @type {typeof NScrollbarProps}
     */
    props: NScrollbarProps,

    /**
     * @type {string[]}
     */
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