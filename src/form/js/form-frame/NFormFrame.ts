import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NFormFrameController } from "./NFormFrameController.ts";

export const NFormFrameProps = {

    /**
     * @type {PropType<boolean>}
     */
    showSearch: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<string>}
     */
    placeholder: {
        type: [String], default: 'Search ...'
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NFormFrame',

    /**
     * @type {typeof NFormFrameProps}
     */
    props: NFormFrameProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NFormFrameController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});