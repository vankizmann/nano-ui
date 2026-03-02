import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NPopoverGroupController } from "./NPopoverGroupController.ts";

export const NPopoverGroupProps = {
    ...Props.Disabled
};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NPopoverGroup',

    /**
     * @type {typeof NPopoverGroupProps}
     */
    props: NPopoverGroupProps,

    setup(props, context)
    {
        let ncx = new NPopoverGroupController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});