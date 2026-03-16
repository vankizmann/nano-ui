import { PropType } from "vue";

export const OptionsObject = {

    /**
     * @type {PropType<object>}
     */
    options: {
        type: Object, default: () => {}
    },

    /**
     * @type {PropType<string>}
     */
    optionsValue: {
        type: String, default: '$index'
    },

    /**
     * @type {PropType<string>}
     */
    optionsLabel: {
        type: String, default: '$value'
    },

};
