import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NButtonController } from "./NButtonController.ts";

export const NButtonProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,
    ...Props.Icon,
    ...Props.IconPositionBefore,

    /**
     * @type {PropType<string>}
     */
    nativeType: {
        type: [String], default: 'button'
    },

    /**
     * @type {PropType<boolean>}
     */
    link: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    glass: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    round: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    square: {
        type: [Boolean], default: false
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NButton',

    /**
     * @type {typeof NButtonProps}
     */
    props: NButtonProps,

    /**
     * @type {string[]}
     */
    emits: [
        'click',
        'dblclick'
    ],

    setup(props, context)
    {
        let ncx = new NButtonController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});