import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NPopoverController } from "./NPopoverController.js";

export const NPopoverProps = PropMerge([
    Props.Load,
    Props.Size,
    Props.Type,
    Props.ThemeDark,
    Props.PositionBottomCenter
], {

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

});

export default defineComponent({

    name: 'NPopover',

    props: NPopoverProps,

    emits: [
        'update:modelValue',
        'open',
        'close',
    ],

    setup(props, context)
    {
        let ncx = new NPopoverController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});