import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NRatingController } from "./NRatingController.ts";

export const NRatingProps = {

    ...Props.Size,
    ...Props.Type,

    /**
     * @type {PropType<string|number>}
     */
    modelValue: {
        type: [String,Number], default: 0
    },

    /**
     * @type {PropType<boolean>}
     */
    closestValue: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<number>}
     */
    stepSize: {
        type: [Number], default: 0.5
    },

    /**
     * @type {PropType<number>}
     */
    decimals: {
        type: [Number], default: 1
    },

    /**
     * @type {PropType<number>}
     */
    stars: {
        type: [Number], default: 5
    },

    /**
     * @type {PropType<string>}
     */
    starsText: {
        type: [String], default: 'No stars|:count Star|:count Stars'
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NRating',

    /**
     * @type {typeof NRatingProps}
     */
    props: NRatingProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NRatingController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});