import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NLoaderController } from "./NLoaderController.ts";

export const NLoaderProps = {

    ...Props.Type,
    ...Props.Size,

    /**
     * @type {PropType<boolean>}
     */
    visible: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<number>}
     */
    minimum: {
        type: [Number], default: 120
    },

    /**
     * @type {PropType<number>}
     */
    debounce: {
        type: [Number], default: 120
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NLoader',

    /**
     * @type {typeof NLoaderProps}
     */
    props: NLoaderProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NLoaderController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});