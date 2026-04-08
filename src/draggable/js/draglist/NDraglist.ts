import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NDraglistController } from "./NDraglistController.ts";

export const NDraglistProps = {

    ...Props.Size,
    ...Props.Type,
    ...Props.Draglist,
    ...Props.EmptyPropsStacked,

    /**
     * @type {PropType<boolean>}
     */
    grid: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<number>}
     */
    itemHeight: {
        type: [Number], default: 32
    },

    /**
     * @type {PropType<number>}
     */
    itemWidth: {
        type: [Number], default: 120
    },

    /**
     * @type {PropType<number>}
     */
    itemOffset: {
        type: [Number], default: 30
    },

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
        'update:cascade',
        'update:current',
        'update:selected',
        'update:expanded',
        'move',
        'row-click',
        'node-click',
        'row-dblclick',
        'node-dblclick',
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