import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NChartDonutController } from "./NChartDonutController.ts";
import { Locale } from "@kizmann/pico-js";

export const NChartDonutProps = {

    ...Props.Size,

    /**
     * @type {PropType<boolean>}
     */
    sort: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<number>}
     */
    limit: {
        type: [Number], default: 4
    },

    /**
     * @type {PropType<boolean>}
     */
    legend: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<number|string>}
     */
    color: {
        type: [Number,String], default: 10
    },

    /**
     * @type {PropType<string>}
     */
    totalLabel: {
        type: [String], default: () => Locale.trans('Total')
    },

    /**
     * @type {PropType<string>}
     */
    otherLabel: {
        type: [String], default: () => Locale.trans('Other')
    },

    /**
     * @type {PropType<number>}
     */
    width: {
        type: [Number], default: 8
    },

    /**
     * @type {PropType<boolean>}
     */
    overlap: {
        type: [Boolean], default: false
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NChartDonut',

    /**
     * @type {typeof NChartDonutProps}
     */
    props: NChartDonutProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NChartDonutController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});