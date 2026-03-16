import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NConfigController } from "./NConfigController.ts";

export const NConfigProps = {

    /**
     * @type {PropType<object>}
     */
    modelValue: {
        type: [Object], default: null
    },

    /**
     * @type {PropType<object>}
     */
    extraValue: {
        type: [Object], default: null
    },

    /**
     * @type {PropType<object>}
     */
    config: {
        type: [Object], default: null
    },

    /**
     * @type {PropType<object>}
     */
    scope: {
        type: [Object], default: null
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NConfig',

    /**
     * @type {typeof NConfigProps}
     */
    props: NConfigProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NConfigController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});