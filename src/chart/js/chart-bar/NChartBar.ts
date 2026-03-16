import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NChartBarController } from "./NChartBarController.ts";
import { Locale } from "@kizmann/pico-js";

export const NChartBarProps = {

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
    minHeight: {
        type: [Number], default: 5
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NChartBar',

    /**
     * @type {typeof NChartBarProps}
     */
    props: NChartBarProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NChartBarController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});