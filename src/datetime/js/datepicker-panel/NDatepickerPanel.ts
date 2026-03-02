import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NDatepickerPanelController } from "./NDatepickerPanelController.ts";

export const NDatepickerPanelProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,

    /**
     * @type {PropType<array|string>}
     */
    modelValue: {
        type: [Array, String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    arrive: {
        type: [String], default: null
    },

    /**
     * @type {PropType<any>}
     */
    clearArrive: {
        type: [], default: null
    },

    /**
     * @type {PropType<string>}
     */
    depart: {
        type: [String], default: null
    },

    /**
     * @type {PropType<any>}
     */
    clearDepart: {
        type: [], default: null
    },

    /**
     * @type {PropType<boolean>}
     */
    range: {
        type: [Boolean], default: false
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
    format: {
        type: [String], default: 'YYYY-MM-DD HH:mm:ss'
    },

    /**
     * @type {PropType<any>}
     */
    minDate: {
        type: [], default: null
    },

    /**
     * @type {PropType<any>}
     */
    maxDate: {
        type: [], default: null
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NDatepickerPanel',

    /**
     * @type {typeof NDatepickerPanelProps}
     */
    props: NDatepickerPanelProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NDatepickerPanelController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});