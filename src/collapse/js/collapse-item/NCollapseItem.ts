import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NCollapseItemController } from "./NCollapseItemController.ts";

export const NCollapseItemProps = {

    /**
     * @type {PropType<number|string>}
     */
    sort: {
        type: [Number,String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    name: {
        type: [String], default: 'default'
    },

    /**
     * @type {PropType<string>}
     */
    label: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    icon: {
        type: [String], default: null
    },

    /**
     * @type {PropType<boolean>}
     */
    scrollbar: {
        type: [Boolean], default: null
    },

    /**
     * @type {PropType<boolean>}
     */
    lazy: {
        type: [Boolean], default: null
    },

    /**
     * @type {PropType<boolean>}
     */
    keep: {
        type: [Boolean], default: null
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NCollapseItem',

    /**
     * @type {typeof NCollapseItemProps}
     */
    props: NCollapseItemProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NCollapseItemController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});