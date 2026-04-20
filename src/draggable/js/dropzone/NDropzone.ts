import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NDropzoneController } from "./NDropzoneController.ts";

export const NDropzone = {

    ...Props.Size,
    ...Props.Type,

    /**
     * @type {PropType<object>}
     */
    item: {
        type: [Object], default: null
    },

    /**
     * @type {PropType<array>}
     */
    allowGroups: {
        type: [Array], default: null
    },

    /**
     * @type {PropType<boolean|function>}
     */
    allowDrop: {
        type: [Boolean, Function], default: true
    }

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NDropzone',

    /**
     * @type {typeof NDropzone}
     */
    props: NDropzone,

    /**
     * @type {string[]}
     */
    emits: [
        'update:item',
    ],

    setup(props, context)
    {
        let ncx = new NDropzoneController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});