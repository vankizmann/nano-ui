import TableCell from "../table-cell";
import { Obj, Any } from "nano-js";

export default {

    name: 'NTableCellImage',

    extends: TableCell,

    computed: {

        preview()
        {
            return Obj.get(this.value, this.column.previewProp);
        }

    },

    methods: {

        getYoutube()
        {
            if ( Any.isEmpty(this.preview) ) {
                return null;
            }

            let page = this.preview.match(/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/);

            if ( page === null ) {
                return null;
            }

            let matchId = this.preview.match(/(\?v=.*?)(?=&|$)/);

            if ( matchId !== null && matchId.length === 2 ) {
                return matchId[0].replace(/^\?v=/, '');
            }

            let matchPath = this.preview.match(/(\.be\/.*?)(?=\?|$)/);

            if ( matchPath !== null && matchPath.length === 2 ) {
                return matchPath[0].replace(/^\.be\//, '');
            }

            let matchEmbed = this.preview.match(/(\/embed\/)(.*?$)/);

            if ( matchEmbed !== null && matchEmbed.length === 3 ) {
                return matchEmbed[0].replace(/^\/embed\//, '');
            }

            return null;
        },

        getVimeo()
        {
            if ( Any.isEmpty(this.preview) ) {
                return null;
            }

            let page = this.preview.match(/^https?:\/\/(www\.|player\.)?vimeo\.com/);

            if ( page === null ) {
                return null;
            }

            let matchUrl = this.preview.match(/(\/[0-9]+)(&|$)/);

            if ( matchUrl !== null && matchUrl.length === 3 ) {
                return matchUrl[0].replace(/(^\/|&$)/, '');
            }

            return null;
        }

    },

    renderYoutube(id)
    {
        return (
            <div class="table-cell-preview__streamable">
                <iframe src={'https://www.youtube.com/embed/' + id} fwidth="640" height="320" frame-border="0"></iframe>
            </div>
        );
    },

    renderVimeo(id)
    {
        return (
            <div class="table-cell-preview__streamable">
                <iframe src={'https://player.vimeo.com/video/' + id} fwidth="640" height="320" frame-border="0"></iframe>
            </div>
        );
    },

    renderImage()
    {
        return (
            <div class="table-cell-preview__image">
                <img src={this.preview} />
            </div>
        )
    },

    renderPreview()
    {
        let htmlPreview = null;

        if ( ! this.preview ) {
            return null;
        }

        let linkYoutube = this.getYoutube();

        if ( linkYoutube ) {
            htmlPreview = this.ctor('renderYoutube')(linkYoutube);
        }

        let linkVimeo = this.getVimeo();

        if ( linkVimeo ) {
            htmlPreview = this.ctor('renderVimeo')(linkVimeo);
        }

        if ( Any.isEmpty(htmlPreview) ) {
            htmlPreview = this.ctor('renderImage')();
        }

        return (
            <NModal type="preview" window={true}>
                { htmlPreview }
            </NModal>
        )
    },

    render()
    {
        if ( this.column.cslo('default') ) {
            return (
                <div>{ this.column.$slots.default(this) }</div> 
            );
        }

        let classList = [
            'n-table-cell',
            'n-table-cell--' + this.column.type
        ];

        if ( this.preview ) {
            classList.push('has-preview');
        }

        return (
            <div class={classList}>
                <div style={'background-image: url(\'' + this.input + '\');'} />
            </div>
        );
    }

}
