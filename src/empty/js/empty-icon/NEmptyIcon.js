import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NEmptyIconController } from "./NEmptyIconController.js";

export const NEmptyIconProps = PropMerge([
    Props.Size,
], {

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

});

export default defineComponent({

    name: 'NEmptyIcon',

    props: NEmptyIconProps,

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