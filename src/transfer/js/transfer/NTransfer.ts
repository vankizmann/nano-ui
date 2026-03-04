import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NTransferController } from "./NTransferController.ts";

export const NTransferProps = {

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
    uniqueProp: {
        type: [String], default: 'id'
    },

    /**
     * @type {PropType<string>}
     */
    sourceLabel: {
        type: [String], default: 'Source'
    },

    /**
     * @type {PropType<string>}
     */
    targetLabel: {
        type: [String], default: 'Target'
    },

    /**
     * @type {PropType<string>}
     */
    sourcePlaceholder: {
        type: [String], default: 'Search source'
    },

    /**
     * @type {PropType<string>}
     */
    targetPlaceholder: {
        type: [String], default: 'Search target'
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NTransfer',

    /**
     * @type {typeof NTransferProps}
     */
    props: NTransferProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NTransferController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});