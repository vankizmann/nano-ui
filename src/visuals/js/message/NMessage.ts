import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NMessageController } from "./NMessageController.ts";

export const NMessageProps = {

    ...Props.Size,
    ...Props.Type,
    ...Props.Icon,
    ...Props.IconPositionBefore,

    /**
     * @type {PropType<boolean>}
     */
    modelValue: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<boolean>}
     */
    closable: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<string>}
     */
    title: {
        type: [String], default: null
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NMessage',

    /**
     * @type {typeof NMessageProps}
     */
    props: NMessageProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NMessageController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});