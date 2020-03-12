import FileListItem from "../file-list-item";

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

    data()
    {
        return {
            vePreview: null
        };
    },

    mounted()
    {
        if ( this.renderPreview ) {
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
