import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NMapController } from "./NMapController.ts";

export const NMapProps = {

    /**
     * @type {PropType<number>}
     */
    lat: {
        type: [Number], default: 0
    },

    /**
     * @type {PropType<number>}
     */
    lng: {
        type: [Number], default: 0
    },

    /**
     * @type {PropType<number>}
     */
    zoom: {
        type: [Number], default: 15
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NMap',

    /**
     * @type {typeof NMapProps}
     */
    props: NMapProps,

    /**
     * @type {string[]}
     */
    emits: [
        //
    ],

    setup(props, context)
    {
        let ncx = new NMapController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});