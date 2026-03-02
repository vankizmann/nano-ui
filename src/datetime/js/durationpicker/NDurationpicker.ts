import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NDurationpickerController } from "./NDurationpickerController.ts";

export const NDurationpickerProps = {

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
        type: [], default: null
    },

    /**
     * @type {PropType<array|object>}
     */
    options: {
        type: [Array, Object], default: () => []
    },

    /**
     * @type {PropType<any>}
     */
    minDuration: {
        type: [], default: null
    },

    /**
     * @type {PropType<any>}
     */
    maxDuration: {
        type: [], default: null
    },

    /**
     * @type {PropType<string>}
     */
    placeholder: {
        type: [String], default: 'Select duration'
    },

    /**
     * @type {PropType<string>}
     */
    negativeText: {
        type: [String], default: 'Negative duration'
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
    years: {
        type: [String], default: ':years Year|:years Years'
    },

    /**
     * @type {PropType<string>}
     */
    months: {
        type: [String], default: ':months Month|:months Months'
    },

    /**
     * @type {PropType<string>}
     */
    days: {
        type: [String], default: ':days Day|:days Days'
    },

    /**
     * @type {PropType<string>}
     */
    hours: {
        type: [String], default: ':hours Hour|:hours Hours'
    },

    /**
     * @type {PropType<string>}
     */
    minutes: {
        type: [String], default: ':minutes Minute|:minutes Minutes'
    },

    /**
     * @type {PropType<string>}
     */
    seconds: {
        type: [String], default: ':seconds Second|:seconds Seconds'
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NDurationpicker',

    /**
     * @type {typeof NDurationpickerProps}
     */
    props: NDurationpickerProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NDurationpickerController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});