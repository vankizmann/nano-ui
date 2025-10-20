import { Any, Event, UUID } from "@kizmann/pico-js";
import { NPreviewHandler } from "../_tools/preview-handler.js";
import { NPreviewHelper } from "../_tools/preview-helper.js";

export default {

    name: 'NPreviewModal',

    inject: {

        NPreview: {
            default: undefined
        }

    },

    props: {

        file: {
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

    },

    data()
    {
        return { uid: UUID(), visible: false };
    },

    watch: {

        visible: function (value) {
            if ( value ) {
                this.NPreview.$emit('slide');
            }
        }

    },

    mounted()
    {
        NPreviewHandler.create()
            .append(this.$el);

        NPreviewHandler.append(this);
    },

    beforeUnmount()
    {
        this.$el.remove();

        NPreviewHandler.remove(this);
    },

    methods: {

        openBox()
        {
            NPreviewHandler.open(this);
        },

        closeBox()
        {
            NPreviewHandler.close();
        }

    },

    renderPrev()
    {
        let prevProps = {
            size: 'lg', square: true, icon: 'fa fa-angle-left'
        };

        prevProps['onClick'] = () => {
            this.gotoPrev();
        };

        return (
            <div class="n-preview__prev">
                <NButton {...prevProps} />
            </div>
        );
    },

    renderNext()
    {
        let nextProps = {
            size: 'lg', square: true, icon: 'fa fa-angle-right'
        };

        nextProps['onClick'] = () => {
            this.gotoNext();
        };

        return (
            <div class="n-preview__next">
                <NButton {...nextProps} />
            </div>
        );
    },



    renderImage()
    {
        let classList = [
            'n-preview-frame'
        ];

        let mime = NPreviewHelper.getMime(this.file);

        if ( mime === 'image' ) {
            return (<NPreviewImage class={classList} src={this.file} />);
        }

        if ( mime === 'video' ) {
            return (<NPreviewVideo class={classList} src={this.file} />);
        }

        let props = {
            type: mime, showSrc: this.showSrc,
        };

        return (<NPreviewPlain class={classList} src={this.file} {...props} />);
    },

    render()
    {
        if ( ! this.visible ) {
            return null;
        }

        return this.ctor('renderImage')();
    },

}