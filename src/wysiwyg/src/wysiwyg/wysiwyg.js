import { Editor, EditorContent } from "tiptap";
import { Arr } from "nano-js";
import CtorMixin from "../../../mixins/src/ctor";

export default {

    name: 'NWysiwyg',

    components: {
        EditorContent
    },

    props: {

        value: {
            default()
            {
                return '';
            },
            type: String
        },

        toolbar: {
            default()
            {
                return [
                    'NWysiwygPluginBold',
                    'NWysiwygPluginLink',
                ];
            },
            type: [Array]
        }

    },

    data()
    {
        return {
            editor: null, extensions: [], plugins: []
        };
    },

    provide()
    {
        return { NWysiwyg: this };
    },

    beforeMount()
    {
        this.initializeEditor()
    },

    beforeDestroy() {
        this.destroyEditor()
    },

    methods: {

        ...CtorMixin,

        initializeEditor()
        {
            this.editor = new Editor({
                content: this.value, extensions: this.extensions
            });

            this.editor.on('update', ({ getHTML }) =>
                this.$emit('input', getHTML()));

        },

        destroyEditor()
        {
            this.editor.destroy();
        },


        addExtension(extension)
        {
            this.extensions.push(extension);

            this.editor.init({
                content: this.value, extensions: this.extensions
            });

            this.editor.createExtensions();
        },

        addPlugin(plugin)
        {
            this.plugins.push(plugin);
        },

        removePlugin(plugin)
        {
            Arr.remove(this.plugins, { _uid: plugin._uid });
        }

    },

    renderToolbar()
    {
        return (
            <div>
                {
                    Arr.each(this.toolbar, (plugin) => {
                        return this.h(plugin);
                    })
                }
            </div>
        )
    },

    render(h)
    {
        this.h = h;

        return (
            <div>
                { this.ctor('renderToolbar')() }
                <EditorContent editor={this.editor} />
            </div>
        );
    }

}