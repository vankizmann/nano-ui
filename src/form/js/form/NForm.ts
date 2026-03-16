import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NFormController } from "./NFormController.ts";

export const NFormProps = {

    ...Props.Load,
    ...Props.Size,
    ...Props.Type,
    ...Props.Disabled,
    ...Props.AlignVertical,

    /**
     * @type {PropType<object>}
     */
    form: {
        type: [Object], default: null
    },

    /**
     * @type {PropType<boolean>}
     */
    dirty: {
        type: [Boolean], default: false
    },

    /**
     * @type {PropType<object>}
     */
    errors: {
        type: [Object], default: null
    },

    /**
     * @type {PropType<string>}
     */
    nativeType: {
        type: [String], default: 'div'
    },

    /**
     * @type {PropType<string>}
     */
    kind: {
        type: [String], default: 'classic'
    },

    /**
     * @type {PropType<boolean>}
     */
    square: {
        type: [Boolean], default: false
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NForm',

    /**
     * @type {typeof NFormProps}
     */
    props: NFormProps,

    /**
     * @type {boolean}
     */
    //inheritAttrs: false,

    /**
     * @type {string[]}
     */
    emits: [
        'update:dirty',
        'submit',
    ],

    setup(props, context)
    {
        let ncx = new NFormController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});