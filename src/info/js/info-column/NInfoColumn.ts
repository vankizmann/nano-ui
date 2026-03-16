import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NInfoColumnController } from "./NInfoColumnController.ts";

export const NInfoColumnProps = {

    ...Props.TrueText,
    ...Props.FalseText,
    ...Props.EmptyText,
    ...Props.UndefinedText,
    ...Props.OptionsObject,

    /**
     * @type {PropType<any>}
     */
    modelValue: {
        default: null
    },

    /**
     * @type {PropType<object>}
     */
    data: {
        type: [Object], default: null
    },

    /**
     * @type {PropType<string>}
     */
    type: {
        type: [String], default: 'string'
    },

    /**
     * @type {PropType<string>}
     */
    label: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    prop: {
        type: [String], default: null
    },

    /**
     * @type {PropType<string>}
     */
    datetimeFormat: {
        type: [String], default: 'LTSD'
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NInfoColumn',

    /**
     * @type {typeof NInfoColumnProps}
     */
    props: NInfoColumnProps,

    setup(props, context)
    {
        let ncx = new NInfoColumnController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});