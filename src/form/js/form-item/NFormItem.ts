import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NFormItemController } from "./NFormItemController.ts";

export const NFormItemProps = {

    /**
     * @type {PropType<boolean>}
     */
    modelValue: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<array>}
     */
    rules: {
        type: [Array], default: () => []
    },

    /**
     * @type {PropType<boolean>}
     */
    conditional: {
        type: [Boolean], default: false
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
    prop: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    tooltip: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    conditionOn: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    conditionOff: {
        type: [String], default: null
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NFormItem',

    /**
     * @type {typeof NFormItemProps}
     */
    props: NFormItemProps,

    setup(props, context)
    {
        let ncx = new NFormItemController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});