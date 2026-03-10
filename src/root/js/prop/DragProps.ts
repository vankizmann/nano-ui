import { PropType } from "vue";

export const Draglist = {

    /**
     * @type {PropType<array>}
     */
    items: {
        type: [Array], default: () => []
    },

    /**
     * @type {PropType<object>}
     */
    current: {
        type: [Object], default: null
    },

    /**
     * @type {PropType<array>}
     */
    selected: {
        type: [Array], default: () => []
    },

    /**
     * @type {PropType<array>}
     */
    expanded: {
        type: [Array], default: () => []
    },

    /**
     * @type {PropType<array>}
     */
    group: {
        type: [Array], default: null
    },

    /**
     * @type {PropType<array>}
     */
    allowGroups: {
        type: [Array], default: null
    },

    /**
     * @type {PropType<number|function>}
     */
    safezone: {
        type: [Number, Function], default: 0.6
    },

    /**
     * @type {PropType<boolean>}
     */
    allowCurrent: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<boolean>}
     */
    renderHandle: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    renderExpand: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    renderSelect: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean|function>}
     */
    allowSelect: {
        type: [Boolean, Function], default: true
    },

    /**
     * @type {PropType<boolean|function>}
     */
    allowDrag: {
        type: [Boolean, Function], default: true
    },

    /**
     * @type {PropType<boolean|function>}
     */
    allowDrop: {
        type: [Boolean, Function], default: true
    },

    /**
     * @type {PropType<function>}
     */
    transformDrop: {
        type: [Function], default: null
    },

    /**
     * @type {PropType<boolean>}
     */
    insertNode: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<boolean>}
     */
    removeNode: {
        type: [Boolean], default: true
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
    childProp: {
        type: [String], default: 'children'
    },

    /**
     * @type {PropType<number>}
     */
    itemHeight: {
        type: [Number], default: 32
    },

    /**
     * @type {PropType<number>}
     */
    itemOffset: {
        type: [Number], default: 30
    },

    /**
     * @type {PropType<boolean>}
     */
    itemSkip: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    rootSkip: {
        type: [Boolean], default: false
    },

}