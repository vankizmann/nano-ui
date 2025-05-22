import { Obj, Arr, Any, Dom } from "@kizmann/pico-js";

const fileMap = {
    image: [
        'jpg', 'jpeg', 'gif', 'svg', 'png'
    ],
    video: [
        'mp4', 'webm', 'mov'
    ],
    font: [
        'woff', 'ttf', 'otf'
    ],
    text: [
        'csv', 'txt', 'html'
    ],
    application: [
        'pdf', 'doc', 'xls'
    ]
}

export default {

    name: 'NPreview',

    props: {

        file: {
            default()
            {
                return null;
            }
        },

        thumb: {
            default()
            {
                return null;
            }
        },

        fit: {
            default()
            {
                return 'cover';
            },
            type: [String]
        },

        mime: {
            default()
            {
                return null;
            },
            typre: [String]
        },

        preview: {
            default()
            {
                return true;
            },
            typre: [Boolean]
        },

        showSrc: {
            default()
            {
                return true;
            },
            typre: [Boolean]
        },

        map: {
            default()
            {
                return fileMap;
            },
            type: [Object]
        }

    },

    computed: {

        tempFile()
        {
            return this.file || this.thumb;
        },

        tempThumb()
        {
            return this.thumb || this.file;
        },

        fileMime()
        {
            return this.getFileMime();
        },

        thumbMime()
        {
            return this.getThumbMime();
        },

    },

    data()
    {
        return {
            lightbox: false, load: false
        };
    },

    methods: {

        getFileMime(fallback = null)
        {
            let file = Obj.get(this.tempFile, 'name',
                this.tempFile);

            if ( Any.isEmpty(file) ) {
                return fallback;
            }

            let extension = file.replace(/^.*?\.([^.?]+)(\?.*?)?$/,
                '$1');

            Obj.each(this.map, (exts, key) => {
                if ( Arr.has(exts, extension) ) fallback = key;
            });

            if ( window.resolveVimeo(file) ) {
                fallback = 'video';
            }

            if ( window.resolveYoutube(file) ) {
                fallback = 'video';
            }

            if ( Any.isString(this.mime) ) {
                fallback = this.mime;
            }

            return fallback;
        },

        getThumbMime(fallback = null)
        {
            if ( Any.isString(this.mime) ) {
                return this.mime;
            }

            let file = Obj.get(this.tempThumb, 'name',
                this.tempThumb);

            if ( Any.isEmpty(file) ) {
                return fallback;
            }

            let extension = file.replace(/^.*?\.([^.?]+)(\?.*?)?$/,
                '$1');

            Obj.each(this.map, (exts, key) => {
                if ( Arr.has(exts, extension) ) fallback = key;
            });

            return fallback;
        },

        showLightbox()
        {
            this.lightbox = true;
        },

    },

    renderPreview()
    {
        if ( ! this.preview ) {
            return this.ctor('renderFull')();
        }

        if ( this.thumbMime === 'image' ) {
            return (<NPreviewImage src={this.tempThumb} />);
        }

        let props = {
            type: this.thumbMime,
            showSrc: false,
        }

        return (<NPreviewPlain src={this.tempThumb} {...props} />);
    },

    renderFull()
    {
        let isObject = Any.isObject(this.tempFile);

        if ( this.fileMime === 'image' ) {
            return (<NPreviewImage src={this.tempFile} />);
        }

        if ( this.fileMime === 'video' && ! isObject ) {
            return (<NPreviewVideo src={this.tempFile} />);
        }

        let props = {
            type: this.thumbMime,
            showSrc: this.showSrc,
        }

        return (<NPreviewPlain src={this.tempFile} {...props} />);
    },

    renderLightbox()
    {
        if ( ! this.lightbox || ! this.preview ) {
            return null;
        }

        let slots = {
            raw: this.ctor('renderFull')
        }

        let props = {
            type: 'preview',
            width: '80%',
            height: '90%',
        }

        return (<NModal vModel={this.lightbox} {...props} v-slots={slots} />);
    },

    render()
    {
        let classList = [
            'n-preview',
            'n-preview--' + this.fit
        ];

        if ( this.preview ) {
            classList.push('n-clickable');
        }

        if ( this.fileMime ) {
            classList.push('n-mime-' + this.fileMime);
        }

        let props = {};

        if ( this.preview ) {
            props.onClick = this.showLightbox;
        }

        let key = btoa(this.tempThumb);

        return (
            <div key={key} class={classList} {...props}>
                { [this.ctor('renderPreview')(), this.ctor('renderLightbox')()] }
            </div>
        );
    }

}