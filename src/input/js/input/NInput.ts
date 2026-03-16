import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NInputController } from "./NInputController.ts";

export const NInputProps = {

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
     * @type {PropType<string>}
     */
    nativeType: {
        type: [String], default: 'text'
    },

    /**
     * @type {PropType<string>}
     */
    placeholder: {
        type: [String], default: ''
    },

    /**
     * @type {PropType<string>}
     */
    label: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    labelPosition: {
        type: [String], default: 'before'
    },

    /**
     * @type {PropType<function>}
     */
    onButtonClick: {
        type: [Function], default: null
    },

    /**
     * @type {PropType<function>}
     */
    onButtonDblclick: {
        type: [Function], default: null
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NInput',

    /**
     * @type {boolean}
     */
    inheritAttrs: false,

    /**
     * @type {typeof NInputProps}
     */
    props: NInputProps,

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
        let ncx = new NInputController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});