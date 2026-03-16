import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NInputFileController } from "./NInputFileController.ts";

export const NInputFileProps = {

    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,
    ...Props.Icon,
    ...Props.Clearable,
    ...Props.ClearValue,

    /**
     * @type {PropType<any>}
     */
    modelValue: {
        default: null
    },

    /**
     * @type {PropType<boolean>}
     */
    multiple: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<string>}
     */
    placeholder: {
        type: [String], default: ''
    },

    /**
     * @type {PropType<boolean>}
     */
    glass: {
        type: [Boolean], default: true
    },

    /**
     * @type {PropType<string>}
     */
    buttonText: {
        type: [String], default: 'Select file'
    },

    /**
     * @type {PropType<string>}
     */
    countText: {
        type: [String], default: ':count File|:count Files'
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NInputFile',

    /**
     * @type {boolean}
     */
    inheritAttrs: false,

    /**
     * @type {typeof NInputFileProps}
     */
    props: NInputFileProps,

    /**
     * @type {string[]}
     */
    emits: [
        'update:modelValue',
    ],

    setup(props, context)
    {
        let ncx = new NInputFileController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});