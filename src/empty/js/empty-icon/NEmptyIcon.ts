import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NEmptyIconController } from "./NEmptyIconController.ts";

export const NEmptyIconProps = {

    ...Props.Size,

    /**
     * @type {PropType<string>}
     */
    image: {
        type: [String], default: 'default'
    },

    /**
     * @type {PropType<boolean>}
     */
    inline: {
        type: [Boolean], default: true
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NEmptyIcon',

    /**
     * @type {typeof NEmptyIconProps}
     */
    props: NEmptyIconProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NEmptyIconController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});