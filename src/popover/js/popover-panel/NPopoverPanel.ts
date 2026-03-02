import { defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NPopoverPanelController } from "src/popover/js/popover-panel/NPopoverPanelController.ts";

export const NPopoverPanelProps = {
    ...Props.Clearable,
    ...Props.ClearValue,
    ...Props.PositionBottomStart,
};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NPopoverPanel',

    /**
     * @type {typeof NPopoverPanelProps}
     */
    props: NPopoverPanelProps,

    setup(props, context)
    {
        let ncx = new NPopoverPanelController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});