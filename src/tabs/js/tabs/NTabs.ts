import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NTabsController } from "./NTabsController.ts";

export const NTabsProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,

    /**
     * @type {PropType<string>}
     */
    modelValue: {
        type: [String], default: 'default'
    },

    /**
     * @type {PropType<boolean>}
     */
    float: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    scrollbar: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<boolean>}
     */
    lazy: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<boolean>}
     */
    keep: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    dragOpen: {
        type: [Boolean], default: false
    }

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NTabs',

    /**
     * @type {typeof NTabsProps}
     */
    props: NTabsProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NTabsController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});