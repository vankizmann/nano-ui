import FileListItem from "../file-list-item";
import { Str } from "nano-js";

export default {

    name: 'NFileListItemImage',

    extends: FileListItem,

    methods: {

        getImagePreview()
        {
            let reader = new FileReader();

            reader.onload = () => {
                this.vePreview = reader.result;
            };

            reader.readAsDataURL(this.value.file);
        },

    },

    computed: {

        exceed()
        {
            return this.NFileList.imageLimit &&
                (this.value.file.size / 1024) > this.NFileList.imageLimit;
        }

    },

    data()
    {
        return {
            vePreview: null
        };
    },

    mounted()
    {
        if ( this.renderPreview && ! this.exceed ) {
            this.getImagePreview();
        }
    },

    renderPreview()
    {
        if ( this.vePreview ) {
            return (<img src={this.vePreview} />);
        }

        return (<span class="fa fad fa-file-image"></span>);
    }

}
