import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NTableController } from "./NTableController.ts";

export const NTableProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.Draglist,

    /**
     * @type {PropType<array>}
     */
    filter: {
        type: [Array], default: null
    },

    /**
     * @type {PropType<string>}
     */
    sortProp: {
        type: [String], default: 'id'
    },

    /**
     * @type {PropType<string>}
     */
    sortDir: {
        type: [String], default: 'desc'
    },

    /**
     * @type {PropType<array>}
     */
    visible: {
        type: [Array], default: null
    },

};

export default defineComponent({

    name: 'NTable',

    props: NTableProps,

    emits: [
        'update:items',
        'update:visible',
        'update:current',
        'update:selected',
        'update:expanded',
        'update:filter',
        'update:sortProp',
        'update:sortDir',
        'filter',
        'sort',
        'row-click',
        'row-dblclick',
    ],

    setup(props, context)
    {
        let ncx = new NTableController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});