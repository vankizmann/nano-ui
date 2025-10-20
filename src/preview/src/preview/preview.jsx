import { UUID, Obj, Arr, Any, Event } from "@kizmann/pico-js";
import { NPreviewHandler } from "../_tools/preview-handler.js"
import { NPreviewHelper } from "../_tools/preview-helper.js"

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

        index: {
            default()
            {
                return 0;
            },
            type: [Number, String]
        },

        group: {
            default()
            {
                return UUID();
            },
            type: [String]
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
            type: [String]
        },

        preview: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        showSrc: {
            default()
            {
                return true;
            },
            type: [Boolean]
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
            return this.mime || NPreviewHelper.getMime(this.tempFile);
        },

        thumbMime()
        {
            return this.mime || NPreviewHelper.getMime(this.tempThumb);
        },

    },

    provide()
    {
        return { NPreview: this };
    },

    methods: {

        openBox()
        {
            this.$refs.modal.openBox();
        },

        closeBox()
        {
            this.$refs.modal.closeBox();
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
            type: this.fileMime, showSrc: false,
        };

        return (<NPreviewPlain src={this.tempThumb} {...props} />);
    },

    renderFull()
    {
        if ( this.fileMime === 'image' ) {
            return (<NPreviewImage class={classList} src={this.tempFile} />);
        }

        if ( this.fileMime === 'video' ) {
            return (<NPreviewVideo class={classList} src={this.tempFile} />);
        }

        let props = {
            type: this.fileMime, showSrc: this.showSrc,
        };

        return (<NPreviewPlain class={classList} src={this.tempFile} {...props} />);
    },

    renderModal()
    {
        if ( ! this.preview ) {
            return null;
        }

        let modalProps = {
            index: this.index, group: this.group, file: this.tempFile, showSrc: this.showSrc
        };

        return (
            <NPreviewModal ref="modal" {...modalProps} />
        );
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
            props.onClick = () => this.openBox();
        }

        let key = btoa(this.tempThumb);

        return (
            <div key={key} class={classList} {...props}>
                { [this.ctor('renderPreview')(), this.ctor('renderModal')()] }
            </div>
        );
    }

}