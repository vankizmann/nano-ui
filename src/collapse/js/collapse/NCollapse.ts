import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NCollapseController } from "./NCollapseController.ts";

export const NCollapseProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,

    /**
     * @type {PropType<array>}
     */
    modelValue: {
        type: [Array], default: () => []
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
        type: [Boolean], default: true
    }

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NCollapse',

    /**
     * @type {typeof NCollapseProps}
     */
    props: NCollapseProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NCollapseController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});