import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NTimepickerController } from "./NTimepickerController.ts";
import { NTimepickerPanelProps } from "../timepicker-panel/NTimepickerPanel.ts";

export const NTimepickerProps = {

    ...Props.Clearable,
    ...Props.ClearValue,
    ...Props.PositionBottomStart,
    ...NTimepickerPanelProps,

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NTimepicker',

    /**
     * @type {typeof NTimepickerProps}
     */
    props: NTimepickerProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NTimepickerController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});