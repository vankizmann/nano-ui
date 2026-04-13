import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NProgressController } from "./NProgressController.ts";

export const NProgressProps = {

    ...Props.Size,
    ...Props.Type,

    /**
     * @type {PropType<number>}
     */
    modelValue: {
        type: [Number], default: 0
    },

    /**
     * @type {PropType<number>}
     */
    state: {
        type: [Number], default: 0
    },

    /**
     * @type {PropType<boolean>}
     */
    changeState: {
        type: [Boolean], default: false
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NProgress',

    /**
     * @type {typeof NProgressProps}
     */
    props: NProgressProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NProgressController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});