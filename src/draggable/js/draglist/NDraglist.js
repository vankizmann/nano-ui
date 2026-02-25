import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NDraglistController } from "./NDraglistController.js";

export const NDraglistProps = PropMerge([
    Props.Load,
    Props.Size,
    Props.Type,
    Props.Draglist
], {

    /**
     * @type {PropType<boolean>}
     */
    scrollPortal: {
        type: [Boolean], default: false
    },

});

export default defineComponent({

    name: 'NDraglist',

    props: NDraglistProps,

    emits: [
        'update:items',
        'update:current',
        'update:selected',
        'update:expanded',
        'row-click',
        'row-dblclick',
    ],

    setup(props, context)
    {
        let ncx = new NDraglistController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});