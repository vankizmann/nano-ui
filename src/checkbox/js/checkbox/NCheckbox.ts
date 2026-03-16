import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NCheckboxControllerGlobal } from "./NCheckboxControllerGlobal.ts";
import { NCheckboxControllerSingle } from "./NCheckboxControllerSingle.ts";

export const NCheckboxProps = {

    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,

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

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NCheckbox',

    /**
     * @type {typeof NCheckboxProps}
     */
    props: NCheckboxProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let name : any = NCheckboxControllerSingle;

        if ( props.global ) {
            name = NCheckboxControllerGlobal;
        }

        let ncx = new name(props, context);

        ncx.pass({
            toggle: 'superToggle',
        });

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});