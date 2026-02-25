import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NPopoverOptionController } from "./NPopoverOptionController.js";

export const NPopoverOptionProps = PropMerge([
    Props.Disabled,
    Props.Icon,
    Props.IconPositionAfter,
], {

    /**
     * @type {PropType<boolean>}
     */
    focus: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    active: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    clickClose: {
        type: [Boolean], default: true
    },

});

export default defineComponent({

    name: 'NPopoverOption',

    props: NPopoverOptionProps,

    emits: [
        'click',
        'dblclick'
    ],

    setup(props, context)
    {
        let ncx = new NPopoverOptionController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});