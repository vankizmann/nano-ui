import { Obj, Arr, Str, Any, Dom } from "@kizmann/pico-js";

window.resolveYoutube = function(url, fallback = null) {

    if ( ! Any.isString(url) ) {
        return fallback;
    }

    let host = url.match(/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/);

    if ( ! host ) {
        return fallback;
    }

    let id = url.match(/(\?v=.*?)(?=&|$)/);

    if ( id && id.length === 2 ) {
        return id[0].replace(/^\?v=/, '');
    }

    let path = url.match(/(\.be\/.*?)(?=\?|$)/);

    if ( path && path.length === 2 ) {
        return path[0].replace(/^\.be\//, '');
    }

    let frame = url.match(/(\/embed\/)(.*?$)/);

    if ( frame && frame.length === 3 ) {
        return frame[0].replace(/^\/embed\//, '');
    }

    return fallback;
}

window.resolveVimeo = function(url, fallback = null) {

    if ( ! Any.isString(url) ) {
        return fallback;
    }

    let host = url.match(/^https?:\/\/(www\.|player\.)?vimeo\.com/);

    if ( ! host ) {
        return fallback;
    }

    let path = url.match(/(\/[0-9]+)(&|$)/);

    if ( path && path.length === 3 ) {
        return path[0].replace(/(^\/|&$)/, '');
    }

    return fallback;
}

export default {

    name: 'NPreviewVideo',

    props: {

        src: {
            default()
            {
                return null;
            }
        },

    },

    data()
    {
        return {
            provider: 'plain', unique: null, tempSrc: null
        };
    },

    mounted()
    {
        this.resolveType();
    },

    watch: {

        'src': function () {
            this.resolveType();
        }

    },

    methods: {

        resolveType()
        {
            this.tempSrc = null;

            if ( this.resolveYoutube() ) {
                return;
            }

            if ( this.resolveVimeo() ) {
                return;
            }

            if ( Any.isObject(this.src) ) {
                this.resolveData();
            }

            this.provider = 'plain';
        },

        resolveData()
        {
            console.log('Coming at some point (blob stream)....');
        },

        resolveYoutube()
        {
            let youtube = window.resolveYoutube(this.src);

            if ( ! youtube ) {
                return false;
            }

            this.provider = 'youtube';

            this.$emit('resolve:youtube', this.unique = youtube);

            return true;
        },

        resolveVimeo()
        {
            let vimeo = window.resolveVimeo(this.src);

            if ( ! vimeo ) {
                return false;
            }

            this.provider = 'vimeo';

            this.$emit('resolve:vimeo', this.unique = vimeo);

            return true;
        }

    },

    renderYoutube()
    {
        let props = {
            src: `https://www.youtube.com/embed/${this.unique}`
        };

        return (
            <iframe {...props}></iframe>
        );
    },

    renderVimeo()
    {
        let props = {
            src: `https://player.vimeo.com/video/${this.unique}`
        };

        return (
            <iframe {...props}></iframe>
        );
    },

    renderPlain()
    {
        let src = Obj.get(this.src, 'name', this.src);

        let extension = src.replace(/^.*?\.([^.?]+)(\?.*?)?$/,
            '$1');

        return (
            <video width="320" height="240" controls>
                <source src={this.tempSrc || this.src} type={`video/${extension}`} />
            </video>
        );
    },

    render()
    {
        let classList = [
            'n-preview-video'
        ];

        return (
            <div class={classList}>
                { this.ctor('render' + Str.ucfirst(this.provider))() }
            </div>
        );
    }

}