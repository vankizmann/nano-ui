import { SetupContext, ExtractPropTypes, PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NSelectController } from "./NSelectController.ts";

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
     * @type {PropType<any>}
     */
    modelValue: {
        default: null
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

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NSelect',

    /**
     * @type {typeof NSelectProps}
     */
    props: NSelectProps,

    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NSelectController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});