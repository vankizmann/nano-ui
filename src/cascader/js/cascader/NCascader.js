import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NCascaderController } from "./NCascaderController.js";
import { NCascaderPanelProps } from "../cascader-panel/NCascaderPanel.js";

export const NCascaderProps = PropMerge([
    Props.Clearable,
    Props.ClearValue,
    Props.EmptyText,
    Props.UndefinedText,
    Props.PositionBottomStart,
], {

    ...NCascaderPanelProps,

    /**
     * @type {PropType<string>}
     */
    placeholder: {
        type: [String], default: 'Please select'
    },

});

export default defineComponent({

    name: 'NCascader',

    props: NCascaderProps,

    emits: [
        'update:modelValue',
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