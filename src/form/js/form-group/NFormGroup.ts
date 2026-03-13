import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NFormGroupController } from "./NFormGroupController.ts";
import { Hash } from "@kizmann/pico-js";

export const NFormGroupProps = {

    ...Props.Icon,

    /**
     * @type {PropType<boolean>}
     */
    modelValue: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<string>}
     */
    nativeType: {
        type: [String], default: 'div'
    },

    /**
     * @type {PropType<string>}
     */
    kind: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    align: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    name: {
        type: [String], default: () => Hash.uuid()
    },

    /**
     * @type {PropType<string>}
     */
    label: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string|number>}
     */
    grid: {
        type: [String,Number], default: null
    },

    /**
     * @type {PropType<string>}
     */
    collapse: {
        type: [Boolean], default: false
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NFormGroup',

    /**
     * @type {typeof NFormGroupProps}
     */
    props: NFormGroupProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NFormGroupController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});