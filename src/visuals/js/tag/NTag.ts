import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NTagController } from "./NTagController.ts";

export const NTagProps = {

    ...Props.Size,
    ...Props.Type,
    ...Props.Color,
    ...Props.Icon,
    ...Props.IconPositionBefore,

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NTag',

    /**
     * @type {typeof NTagProps}
     */
    props: NTagProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NTagController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});