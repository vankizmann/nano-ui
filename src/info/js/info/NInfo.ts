import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NInfoController } from "./NInfoController.ts";
import { Locale } from "@kizmann/pico-js";

export const NInfoProps = {

    ...Props.Size,
    ...Props.Type,

    /**
     * @type {PropType<object>}
     */
    item: {
        type: [Object], default: null
    },

    /**
     * @type {PropType<function>}
     */
    syncEvent: {
        type: [Function], default: null
    },

    /**
     * @type {PropType<boolean>}
     */
    scrollbar: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    renderEmpty: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<string>}
     */
    emptyText: {
        type: [String], default: () => Locale.trans('No item')
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NInfo',

    /**
     * @type {typeof NInfoProps}
     */
    props: NInfoProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NInfoController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});