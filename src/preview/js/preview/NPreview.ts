import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NPreviewController } from "./NPreviewController.ts";
import { Hash } from "@kizmann/pico-js";

export const NPreviewProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.ThemeNone,

    /**
     * @type {PropType<any>}
     */
    file: {
        default: null
    },

    /**
     * @type {PropType<any>}
     */
    thumb: {
        default: null
    },

    /**
     * @type {PropType<string>}
     */
    title: {
        type: [String], default: null
    },

    /**
     * @type {PropType<number>}
     */
    index: {
        type: [Number], default: null
    },

    /**
     * @type {PropType<string>}
     */
    group: {
        type: [String], default: () => Hash.uuid()
    },

    /**
     * @type {PropType<string>}
     */
    fit: {
        type: [String], default: 'contain'
    },

    /**
     * @type {PropType<string>}
     */
    mime: {
        type: [String], default: null
    },

    /**
     * @type {PropType<boolean>}
     */
    forceFile: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<boolean>}
     */
    preview: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<array>}
     */
    previewTypes: {
        type: [Array], default: () => ['text', 'image']
    },

    /**
     * @type {PropType<boolean>}
     */
    showPath: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<string>}
     */
    linkText: {
        type: [String], default: 'Download file'
    },

    /**
     * @type {PropType<boolean>}
     */
    showLink: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<boolean>}
     */
    onFocus: {
        type: [Function], default: null
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NPreview',

    /**
     * @type {typeof NPreviewProps}
     */
    props: NPreviewProps,

    /**
     * @type {string[]}
     */
    emits: [
        'focus'
    ],

    setup(props, context)
    {
        let ncx = new NPreviewController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});