import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NButtonController } from "./NButtonController.js";

export const NButtonProps = PropMerge([
    Props.Load,
    Props.Size,
    Props.Type,
    Props.Disabled,
    Props.Icon,
    Props.IconPositionBefore
], {

    /**
     * @type {PropType<string>}
     */
    nativeType: {
        type: [String], default: 'button'
    },

    /**
     * @type {PropType<boolean>}
     */
    link: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    glass: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    round: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    square: {
        type: [Boolean], default: false
    },

});

export default defineComponent({

    name: 'NButton',

    props: NButtonProps,

    emits: [
        'click',
        'dblclick'
    ],

    setup(props, context)
    {
        let ncx = new NButtonController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});