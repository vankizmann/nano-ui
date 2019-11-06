import NWysiwygPlugin from "../wysiwyg-plugin";
import { Bold } from "tiptap-extensions";

export default {

    name: 'NWysiwygPluginBold',

    extends: NWysiwygPlugin,

    computed: {

        active()
        {
            return this.editor.isActive.bold();
        }

    },

    methods: {

        toggleBoldState()
        {
            this.editor.commands.bold();
        }

    },

    created()
    {
        this.NWysiwyg.addExtension(new Bold);
    },

    render()
    {
        return (
            <div>
                <NButton square={true} icon="fa fa-bold" vOn:click={this.toggleBoldState}></NButton>
            </div>
        );
    }

}