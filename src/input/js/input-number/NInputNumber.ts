import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NInputNumberController } from "./NInputNumberController.ts";

export const NInputNumberProps = {
    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,
    ...Props.Clearable,
    ...Props.ClearValue,
    ...Props.Icon,
    ...Props.IconPositionBefore,
    ...Props.IconDisabled,

    /**
     * @type {PropType<string|number>}
     */
    modelValue: {
        type: [String, Number], default: ''
    },

    /**
     * @type {PropType<number>}
     */
    min: {
        type: [Number], default: 0
    },

    /**
     * @type {PropType<number>}
     */
    max: {
        type: [Number], default: Number.MAX_SAFE_INTEGER
    },

    /**
     * @type {PropType<number>}
     */
    stepSize: {
        type: [Number], default: 1
    },

    /**
     * @type {PropType<number>}
     */
    precision: {
        type: [Number], default: 0
    },

    /**
     * @type {PropType<string>}
     */
    format: {
        type: [String], default: ':count'
    },

    /**
     * @type {PropType<string>}
     */
    placeholder: {
        type: [String], default: ''
    },


};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NInputNumber',

    /**
     * @type {boolean}
     */
    inheritAttrs: false,

    /**
     * @type {typeof NInputNumberProps}
     */
    props: NInputNumberProps,

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
        let ncx = new NInputNumberController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});