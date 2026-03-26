import { PropType } from "vue";

export const Load = {

    /**
     * @type {PropType<boolean>}
     */
    load: {
        type: [Boolean], default: false
    },

};

export const Disabled = {

    /**
     * @type {PropType<boolean>}
     */
    disabled: {
        type: [Boolean], default: false
    },

};

export const Size = {

    /**
     * @type {PropType<string>}
     */
    size: {
        type: [String], default: null
    },

};

export const Type = {

    /**
     * @type {PropType<string>}
     */
    type: {
        type: [String], default: null
    },

};

export const Color = {

    /**
     * @type {PropType<string|number>}
     */
    color: {
        type: [String, Number], default: null
    },

};

export const Clearable = {

    /**
     * @type {PropType<boolean>}
     */
    clearable: {
        type: [Boolean], default: false
    },

};

export const ClearValue = {

    /**
     * @type {PropType<string|number|boolean>}
     */
    clearValue: {
        type: [String, Number, Boolean], default: null
    },

};

export const ThemeNone = {

    /**
     * @type {PropType<string>}
     */
    theme: {
        type: [String], default: null
    },

};

export const ThemeDark = {

    /**
     * @type {PropType<string>}
     */
    theme: {
        type: [String], default: 'dark'
    },

};
