import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NCheckboxControllerGlobal } from "./NCheckboxControllerGlobal.js";
import { NCheckboxControllerSingle } from "./NCheckboxControllerSingle.js";

export const NCheckboxProps = PropMerge([
    Props.Size,
    Props.Type,
    Props.Disabled,
], {

    /**
     * @type {PropType<number|boolean>}
     */
    modelValue: {
        type: [Number, Boolean], default: false
    },

    /**
     * @type {PropType<number|boolean|string>}
     */
    value: {
        type: [Number, Boolean, String], default: null
    },

    /**
     * @type {PropType<boolean>}
     */
    allowUncheck: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    global: {
        type: [Boolean], default: false
    },

});

export default defineComponent({

    name: 'NCheckbox',

    props: NCheckboxProps,

    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let name = NCheckboxControllerSingle;

        if ( props.global ) {
            name = NCheckboxControllerGlobal;
        }

        let ncx = new name(props, context);

        ncx.pass([
            'toggle'
        ]);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});