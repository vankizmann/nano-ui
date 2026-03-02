import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NCascaderPanelController } from "./NCascaderPanelController.ts";

export const NCascaderPanelProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,

    /**
     * @type {PropType<array|object>}
     */
    modelValue: {
        type: [Array,Object], default: null
    },

    /**
     * @type {PropType<string>}
     */
    splitValue: {
        type: [String], default: null
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

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NCascaderPanel',

    /**
     * @type {typeof NCascaderPanelProps}
     */
    props: NCascaderPanelProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
        'update:splitValue',
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