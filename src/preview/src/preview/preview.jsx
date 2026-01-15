import { UUID, Obj, Arr, Any, Event, Locale } from "@kizmann/pico-js";

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

        title: {
            default()
            {
                return null;
            },
            type: [String]
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
        },

        buttonText: {
            default()
            {
                return Locale.trans('Download file');
            },
            type: [String]
        },

        renderButton: {
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

    renderTitle()
    {
        if ( Any.isEmpty(this.title) ) {
            return null;
        }

        return (
            <div class="n-preview__title">
                <span>{this.title}</span>
            </div>
        );
    },

    renderPreview()
    {
        if ( ! this.preview ) {
            return this.ctor('renderFull')();
        }

        let type = this.PreviewHelper.getType(this.tempThumb);

        if ( type === 'image' ) {
            return (<NPreviewImage src={this.tempThumb} />);
        }

        let props = {
            showSrc: false, renderButton: false,
        };

        return (<NPreviewPlain src={this.tempThumb} {...props} />);
    },

    renderFull()
    {
        let type = this.PreviewHelper.getType(this.tempFile);

        if ( type === 'image' ) {
            return (<NPreviewImage src={this.tempFile} />);
        }

        if ( type === 'video' ) {
            return (<NPreviewVideo src={this.tempFile} />);
        }

        let props = {
            showSrc: this.showSrc, buttonText: this.buttonText, renderButton: this.renderButton
        };

        return (<NPreviewPlain src={this.tempFile} {...props} />);
    },

    renderModal()
    {
        if ( ! this.preview ) {
            return null;
        }

        let modalProps = {
            index: this.index, group: this.group, file: this.tempFile
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

        let type = this.PreviewHelper.getType(this.tempFile);

        if ( type ) {
            classList.push('n-mime-' + type);
        }

        let thumb = this.PreviewHelper.getType(this.tempThumb);

        if ( thumb ) {
            classList.push('n-mime-preview-' + thumb);
        }

        let props = {};

        if ( this.preview ) {
            props.onClick = () => this.openBox();
        }

        let key = btoa(this.tempThumb);

        return (
            <div key={key} class={classList} {...props}>
                { [this.ctor('renderPreview')(), this.ctor('renderTitle')(), this.ctor('renderModal')()] }
            </div>
        );
    }

}