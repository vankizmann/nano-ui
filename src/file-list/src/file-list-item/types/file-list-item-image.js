import FileListItem from "../file-list-item";

export default {

    name: 'NFileListItemImage',

    extends: FileListItem,

    methods: {

        getImagePreview()
        {
            let reader = new FileReader();

            reader.onload = () => {
                this.preview = reader.result;
            };

            reader.readAsDataURL(this.value.file);
        },

    },

    data()
    {
        return {
            preview: null
        };
    },

    mounted()
    {
        this.getImagePreview();
    },

    renderPreview()
    {
        if ( this.preview !== null ) {
            return (<img src={this.preview} />);
        }

        return (<span class="fa fad fa-file-image"></span>);
    }

}
