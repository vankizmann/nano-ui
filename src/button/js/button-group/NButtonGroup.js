import { PropType, defineComponent } from "vue";
import { PropMerge, Props } from "../../../root/index.js";
import { NButtonGroupController } from "./NButtonGroupController.js";

export const NButtonGroupProps = PropMerge([
    Props.Load,
    Props.Size,
    Props.Type,
    Props.Disabled,
], {
    //
});

export default defineComponent({

    name: 'NButtonGroup',

    props: NButtonGroupProps,

    setup(props, context)
    {
        let ncx = new NButtonGroupController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});