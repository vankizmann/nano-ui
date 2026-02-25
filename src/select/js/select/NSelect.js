import { SetupContext, ExtractPropTypes, PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NSelectController } from "./NSelectController.js";

/**
 * @typedef {NSelectProps} NSelectPropsInterface
 * @mixes import('../../../root/index.js').Props.Load
 * @mixes import('../../../root/index.js').Props.Size
 * @mixes import('../../../root/index.js').Props.Type
 * @mixes import('../../../root/index.js').Props.Type
 */

/**
 * @type {NSelectPropsInterface}
 */
export const NSelectProps = {
    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,
    ...Props.Clearable,
    ...Props.ClearValue,
    ...Props.EmptyText,
    ...Props.UndefinedText,
    ...Props.PositionBottomCenter,
    ...Props.OptionsObject,

    /**
     * @type {PropType<string|array>}
     */
    modelValue: {
        type: [String,Array], default: null
    },

    /**
     * @type {PropType<boolean>}
     */
    multiple: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    allowCreate: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    collapse: {
        type: [Boolean], default: true
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
    collapseText: {
        type: [String], default: '+:count item|+:count items'
    },

};

/**
 * @type {typeof NSelectPropsInterface}
 */
export default defineComponent({

    name: 'NSelect',

    props: NSelectProps,

    emits: [
        'update:modelValue',
    ],

    /**
     *
     * @param {ExtractPropTypes<NSelectProps>} props
     * @param {SetupContext} context
     * @returns {function}
     */
    setup(props, context)
    {
        let ncx = new NSelectController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});