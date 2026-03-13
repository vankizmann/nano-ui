import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NChartItemController } from "./NChartItemController.ts";

export const NChartItemProps = {

    ...Props.Type,
    ...Props.Color,

    /**
     * @type {PropType<string|number>}
     */
    value: {
        type: [String,Number], default: null
    },

    /**
     * @type {PropType<string>}
     */
    axis: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    label: {
        type: [String], default: null
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NChartItem',

    /**
     * @type {typeof NChartItemProps}
     */
    props: NChartItemProps,

    setup(props, context)
    {
        let ncx = new NChartItemController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});