import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NPopoverController } from "./NPopoverController.ts";

export const NPopoverProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.ThemeDark,
    ...Props.PositionBottomCenter,

    /**
     * @type {PropType<boolean>}
     */
    modelValue: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<number>}
     */
    width: {
        type: [Number], default: null
    },

    /**
     * @type {PropType<string|null>}
     */
    target: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    trigger: {
        type: [String], default: 'click'
    },

    /**
     * @type {PropType<boolean>}
     */
    toggle: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    scrollbar: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    escapeClose: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<boolean>}
     */
    scrollClose: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<boolean>}
     */
    multiClose: {
        type: [Boolean], default: true
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NPopover',

    /**
     * @type {typeof NPopoverProps}
     */
    props: NPopoverProps,

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
        let ncx = new NPopoverController(props, context);

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