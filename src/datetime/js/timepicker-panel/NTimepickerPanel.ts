import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NTimepickerPanelController } from "./NTimepickerPanelController.ts";

export const NTimepickerPanelProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,

    /**
     * @type {PropType<string>}
     */
    modelValue: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    placeholder: {
        type: [String], default: 'Select time'
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
        type: [String], default: 'HH:mm:ss'
    },

    /**
     * @type {PropType<number>}
     */
    hoursInterval: {
        type: [Number], default: 1
    },

    /**
     * @type {PropType<number>}
     */
    minutesInterval: {
        type: [Number], default: 1
    },

    /**
     * @type {PropType<number>}
     */
    secondsInterval: {
        type: [Number], default: 1
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NTimepickerPanel',

    /**
     * @type {typeof NTimepickerPanelProps}
     */
    props: NTimepickerPanelProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NTimepickerPanelController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});