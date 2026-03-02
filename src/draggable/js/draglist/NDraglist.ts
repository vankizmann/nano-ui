import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NDraglistController } from "./NDraglistController.ts";

export const NDraglistProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.Draglist,

    /**
     * @type {PropType<boolean>}
     */
    scrollPortal: {
        type: [Boolean], default: false
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NDraglist',

    /**
     * @type {typeof NDraglistProps}
     */
    props: NDraglistProps,

    /**
     * @type {string[]}
     */
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