import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NDatetimepickerController } from "./NDatetimepickerController.ts";

export const NDatetimepickerProps = {

    ...Props.Type,
    ...Props.Size,
    ...Props.Disabled,
    ...Props.Clearable,
    ...Props.ClearValue,
    ...Props.PositionBottomStart,

    /**
     * @type {PropType<any>}
     */
    modelValue: {
        default: null
    },

    /**
     * @type {PropType<any>}
     */
    minDate: {
        default: null
    },

    /**
     * @type {PropType<any>}
     */
    maxDate: {
        default: null
    },

    /**
     * @type {PropType<number>}
     */
    panels: {
        type: [Number], default: 1
    },

    /**
     * @type {PropType<string>}
     */
    placeholder: {
        type: [String], default: 'Select datetime'
    },

    /**
     * @type {PropType<string>}
     */
    format: {
        type: [String], default: 'YYYY-MM-DD HH:mm:ss'
    },

    /**
     * @type {PropType<string>}
     */
    displayFormat: {
        type: [String], default: 'YYYY-MM-DD HH:mm:ss'
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NDatetimepicker',

    /**
     * @type {typeof NDatetimepickerProps}
     */
    props: NDatetimepickerProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NDatetimepickerController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});