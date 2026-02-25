import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NTableColumnController } from "./NTableColumnController.js";

export const NTableColumnProps = PropMerge([
    Props.TrueText,
    Props.FalseText,
    Props.EmptyText,
    Props.UndefinedText,
    Props.OptionsObject,
], {

    /**
     * @type {PropType<any>}
     */
    uid: {
        default: null
    },

    /**
     * @type {PropType<any>}
     */
    modelValue: {
        default: null
    },

    /**
     * @type {PropType<object>}
     */
    data: {
        type: [Object], default: null
    },

    /**
     * @type {PropType<object>}
     */
    plugin: {
        type: [Object], default: null
    },

    /**
     * @type {PropType<string>}
     */
    type: {
        type: [String], default: 'string'
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
     * @type {PropType<boolean>}
     */
    sort: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<string>}
     */
    sortProp: {
        type: [String], default: null
    },

    /**
     * @type {PropType<boolean>}
     */
    filter: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<string>}
     */
    filterProp: {
        type: [String], default: null
    },

    /**
     * @type {PropType<boolean|function>}
     */
    disabled: {
        type: [Boolean, Function], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    visible: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<string|number>}
     */
    breakpoint: {
        type: [String,Number], default: null
    },

    /**
     * @type {PropType<string>}
     */
    align: {
        type: [String], default: 'left'
    },

    /**
     * @type {PropType<string|number>}
     */
    width: {
        type: [String,Number], default: null
    },

    /**
     * @type {PropType<number>}
     */
    fixedWidth: {
        type: [Number], default: null
    },

    /**
     * @type {PropType<number>}
     */
    minWidth: {
        type: [Number], default: 60
    },

    /**
     * @type {PropType<number>}
     */
    maxWidth: {
        type: [Number], default: null
    },

    /**
     * @type {PropType<string>}
     */
    datetimeFormat: {
        type: [String], default: 'LTSD'
    },

});

export default defineComponent({

    name: 'NTableColumn',

    props: NTableColumnProps,

    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NTableColumnController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});