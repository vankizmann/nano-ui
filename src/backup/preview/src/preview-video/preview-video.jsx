import { Obj, Arr, Str, Mix, Dom } from "@kizmann/pico-js";

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

            if ( Mix.isRef(this.src) ) {
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
            let youtube = this.PreviewHelper.getYoutubeKey(this.src);

            if ( ! youtube ) {
                return false;
            }

            this.provider = 'youtube';

            this.$emit('resolve:youtube', this.unique = youtube);

            return true;
        },

        resolveVimeo()
        {
            let vimeo = this.PreviewHelper.getVimeoKey(this.src);

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

        return (
            <video width="320" height="240" controls>
                <source src={this.tempSrc || this.src} type={this.PreviewHelper.getMime(src)} />
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