import { PropType, defineComponent } from "vue";
import { Props, PropMerge } from "../../../root/index.js";
import { NInputController } from "./NInputController.js";

export const NInputProps = PropMerge([
    Props.Load,
    Props.Size,
    Props.Type,
    Props.Disabled,
    Props.Clearable,
    Props.ClearValue,
    Props.Icon,
    Props.IconPositionBefore,
    Props.IconDisabled
], {

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


});

export default defineComponent({

    name: 'NInput',

    inheritAttrs: false,

    props: NInputProps,

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