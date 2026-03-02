import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NPopoverOptionController } from "./NPopoverOptionController.ts";

export const NPopoverOptionProps = {

    ...Props.Disabled,
    ...Props.Icon,
    ...Props.IconPositionAfter,

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

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NPopoverOption',

    /**
     * @type {typeof NPopoverOptionProps}
     */
    props: NPopoverOptionProps,

    /**
     * @type {string[]}
     */
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