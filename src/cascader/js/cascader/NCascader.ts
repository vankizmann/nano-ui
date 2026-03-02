import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NCascaderController } from "./NCascaderController.ts";
import { NCascaderPanelProps } from "../cascader-panel/NCascaderPanel.ts";

export const NCascaderProps = {

    ...Props.Clearable,
    ...Props.ClearValue,
    ...Props.EmptyText,
    ...Props.UndefinedText,
    ...Props.PositionBottomStart,
    ...NCascaderPanelProps,

    /**
     * @type {PropType<number>}
     */
    collapse: {
        type: [Number], default: 3
    },

    /**
     * @type {PropType<string>}
     */
    collapseText: {
        type: [String], default: '...'
    },

    /**
     * @type {PropType<boolean>}
     */
    collapseFirst: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<string>}
     */
    placeholder: {
        type: [String], default: 'Please select'
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NCascader',

    /**
     * @type {typeof NCascaderProps}
     */
    props: NCascaderProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
        'update:splitValue',
    ],

    setup(props, context)
    {
        let ncx = new NCascaderController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});