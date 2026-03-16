import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NTextareaController } from "./NTextareaController.ts";

export const NTextareaProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,

    /**
     * @type {PropType<string|number>}
     */
    modelValue: {
        type: [String, Number], default: ''
    },

    /**
     * @type {PropType<string>}
     */
    placeholder: {
        type: [String], default: ''
    },

    /**
     * @type {PropType<boolean>}
     */
    autoRows: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<number>}
     */
    minRows: {
        type: [Number], default: 3
    },

    /**
     * @type {PropType<number>}
     */
    maxRows: {
        type: [Number], default: 6
    },

    /**
     * @type {PropType<number>}
     */
    maxLength: {
        type: [Number], default: null
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NTextarea',

    /**
     * @type {boolean}
     */
    inheritAttrs: false,

    /**
     * @type {typeof NTextareaProps}
     */
    props: NTextareaProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
        'input',
        'keydown',
        'keyup',
        'focus',
        'blur',
    ],

    setup(props, context)
    {
        let ncx = new NTextareaController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});