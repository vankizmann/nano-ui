import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NSwitchController } from "./NSwitchController.js";

export const NSwitchProps = PropMerge([
    Props.Size, Props.Disabled,
], {

    /**
     * @type {PropType<number|boolean|string|object>}
     */
    modelValue: {
        type: [Number, Boolean, String, Object], default: false
    },

    /**
     * @type {PropType<string>}
     */
    onType: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    offType: {
        type: [String], default: 'default'
    },

    /**
     * @type {PropType<number|boolean|string|object>}
     */
    onValue: {
        type: [Number, Boolean, String, Object], default: true
    },

    /**
     * @type {PropType<number|boolean|string|object>}
     */
    offValue: {
        type: [Number, Boolean, String, Object], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    inline: {
        type: [Boolean], default: true
    },

});

export default defineComponent({

    name: 'NSwitch',

    props: NSwitchProps,

    emits: [
        'update:modelValue'
    ],

    setup(props, context)
    {
        let ncx = new NSwitchController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});