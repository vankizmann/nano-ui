import { PropType, defineComponent } from "vue";
import { Props, Styler } from "../../../root/index.ts";
import { NDatepickerController } from "./NDatepickerController.ts";
import { NDatepickerPanelProps } from "../datepicker-panel/NDatepickerPanel.ts";

export const NDatepickerProps = {

    ...Props.Clearable,
    ...Props.ClearValue,
    ...Props.PositionBottomStart,
    ...NDatepickerPanelProps,

    /**
     * @type {PropType<string>}
     */
    placeholder: {
        type: [String], default: 'Select date'
    },

    /**
     * @type {PropType<string>}
     */
    placeholderArrive: {
        type: [String], default: 'Start date'
    },

    /**
     * @type {PropType<string>}
     */
    placeholderDepart: {
        type: [String], default: 'End date'
    },

    /**
     * @type {PropType<string>}
     */
    rangeSeperator: {
        type: [String], default: '-'
    },

    /**
     * @type {PropType<string>}
     */
    displayFormat: {
        type: [String], default: 'YYYY-MM-DD'
    },

    /**
     * @type {PropType<string>}
     */
    icon: {
        type: [String], default: () => Styler.icon('calendar')
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NDatepicker',

    /**
     * @type {typeof NDatepickerProps}
     */
    props: NDatepickerProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
        'update:arrive',
        'update:depart',
    ],

    setup(props, context)
    {
        let ncx = new NDatepickerController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});