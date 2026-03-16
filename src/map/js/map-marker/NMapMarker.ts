import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NMapMarkerController } from "./NMapMarkerController.ts";

export const NMapMarkerProps = {

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
     * @type {PropType<boolean>}
     */
    drag: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<object>}
     */
    options: {
        type: [Object], default: {}
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NMapMarker',

    /**
     * @type {typeof NMapMarkerProps}
     */
    props: NMapMarkerProps,

    setup(props, context)
    {
        let ncx = new NMapMarkerController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        ncx.pass({
            'address': 'superAddress'
        });

        return ncx.render();
    }

});