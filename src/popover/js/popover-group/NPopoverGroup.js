import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NPopoverGroupController } from "./NPopoverGroupController.js";

export const NPopoverGroupProps = PropMerge([
    Props.Disabled,
], {
    //
});

export default defineComponent({

    name: 'NPopoverGroup',

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