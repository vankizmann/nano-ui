import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NButtonGroupController } from "./NButtonGroupController.ts";

export const NButtonGroupProps = {
    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,
};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NButtonGroup',

    /**
     * @type {typeof NButtonGroupProps}
     */
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