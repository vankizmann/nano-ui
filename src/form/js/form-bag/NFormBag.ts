import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NFormBagController } from "./NFormBagController.ts";

export const NFormBagProps = {

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NFormBag',

    /**
     * @type {typeof NFormBagProps}
     */
    props: NFormBagProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NFormBagController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});