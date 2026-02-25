import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NCascaderPanelController } from "./NCascaderPanelController.js";

export const NCascaderPanelProps = PropMerge([
    Props.Load,
    Props.Size,
    Props.Type,
    Props.Disabled,
], {

    /**
     * @type {PropType<array|object>}
     */
    modelValue: {
        type: [Array,Object], default: null
    },

    /**
     * @type {PropType<array|object>}
     */
    splitValue: {
        type: [Array,Object], default: null
    },

    /**
     * @type {PropType<string>}
     */
    placeholder: {
        type: [String], default: 'Please select'
    },

    /**
     * @type {PropType<string>}
     */
    trigger: {
        type: [String], default: 'hover'
    },

    /**
     * @type {PropType<array|object>}
     */
    options: {
        type: [Array,Object], default: () => []
    },

    /**
     * @type {PropType<array|object>}
     */
    visible: {
        type: [Array,Object], default: () => []
    },

    /**
     * @type {PropType<string>}
     */
    labelProp: {
        type: [String], default: 'label'
    },

    /**
     * @type {PropType<string>}
     */
    valueProp: {
        type: [String], default: 'value'
    },

    /**
     * @type {PropType<string>}
     */
    childProp: {
        type: [String], default: 'children'
    },

    /**
     * @type {PropType<string>}
     */
    disabledProp: {
        type: [String], default: 'disabled'
    },

});

export default defineComponent({

    name: 'NCascaderPanel',

    props: NCascaderPanelProps,

    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NCascaderPanelController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});