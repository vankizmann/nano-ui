import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NDrawerController } from "./NDrawerController.ts";

export const NDrawerProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.ThemeDark,
    ...Props.PositionDrawer,

    /**
     * @type {PropType<boolean>}
     */
    modelValue: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<string>}
     */
    mode: {
        type: [String], default: 'modal'
    },

    /**
     * @type {PropType<boolean>}
     */
    listen: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<boolean>}
     */
    closable: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<string>}
     */
    width: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    height: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    target: {
        type: [String], default: null
    },

    /**
     * @type {PropType<function>}
     */
    beforeOpen: {
        type: [Function], default: null
    },

    /**
     * @type {PropType<function>}
     */
    beforeClose: {
        type: [Function], default: null
    }

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NDrawer',

    /**
     * @type {typeof NDrawerProps}
     */
    props: NDrawerProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
        'open',
        'close',
    ],

    setup(props, context)
    {
        let ncx = new NDrawerController(props, context);

        ncx.pass({
            open: 'superOpen',
            close: 'superClose',
        });

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});