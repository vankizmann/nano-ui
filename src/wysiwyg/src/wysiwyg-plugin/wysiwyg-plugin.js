import CtorMixin from "../../../mixins/src/ctor";

export default {

    name: 'NWysiwygPlugin',

    inject: {

        NWysiwyg: {
            default: undefined
        }

    },

    computed: {

        editor()
        {
            return this.NWysiwyg.editor;
        },

        getMarkAttrs()
        {
            return this.editor.getMarkAttrs.bind(this.editor)
        }

    },

    methods: {

        ...CtorMixin

    },

    created()
    {
        this.NWysiwyg.addPlugin(this);
    },

    beforeDestroy()
    {
        this.NWysiwyg.removePlugin(this);
    }



}