import { PropType, defineComponent } from "vue";
import { Props, Styler } from "../../../root/index.ts";
import NDurationpickerController from "./NDurationpickerController.ts";

export const NDurationpickerOptions = [
    60 * 5,
    60 * 10,
    60 * 15,
    60 * 30,
    60 * 45,
    60 * 60,
    60 * 90,
    60 * 120,
    60 * 150,
    60 * 60 * 3,
    60 * 60 * 4,
    60 * 60 * 5,
    60 * 60 * 6,
    60 * 60 * 12,
    60 * 60 * 24,
    60 * 60 * 24 * 2,
    60 * 60 * 24 * 3,
    60 * 60 * 24 * 4,
    60 * 60 * 24 * 5,
    60 * 60 * 24 * 6,
    60 * 60 * 24 * 7,
];

export const NDurationpickerProps = {

    ...Props.Type,
    ...Props.Size,
    ...Props.Disabled,
    ...Props.Clearable,
    ...Props.ClearValue,
    ...Props.EmptyText,
    ...Props.PositionBottomStart,

    /**
     * @type {PropType<any>}
     */
    modelValue: {
        default: null
    },

    /**
     * @type {PropType<array|object>}
     */
    options: {
        type: [Array, Object], default: () => NDurationpickerOptions
    },

    /**
     * @type {PropType<any>}
     */
    minDuration: {
        default: null
    },

    /**
     * @type {PropType<any>}
     */
    maxDuration: {
        default: null
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
    dates: {
        type: [String], default: ':count Day|:count Days'
    },

    /**
     * @type {PropType<string>}
     */
    hours: {
        type: [String], default: ':count Hour|:count Hours'
    },

    /**
     * @type {PropType<string>}
     */
    minutes: {
        type: [String], default: ':count Minute|:count Minutes'
    },

    /**
     * @type {PropType<string>}
     */
    seconds: {
        type: [String], default: ':count Second|:count Seconds'
    },

    /**
     * @type {PropType<string>}
     */
    icon: {
        type: [String], default: () => Styler.icon('duration')
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