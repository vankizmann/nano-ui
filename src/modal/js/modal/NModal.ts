import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NModalController } from "./NModalController.ts";

export const NModalProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.ThemeDark,
    ...Props.PositionModal,

    /**
     * @type {PropType<boolean>}
     */
    modelValue: {
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
     * @type {PropType<string|number>}
     */
    width: {
        type: [String,Number], default: null
    },

    /**
     * @type {PropType<string|number>}
     */
    height: {
        type: [String,Number], default: null
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
    name: 'NModal',

    /**
     * @type {typeof NModalProps}
     */
    props: NModalProps,

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
        let ncx = new NModalController(props, context);

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