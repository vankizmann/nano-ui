import { Mix, Event, Obj, Hash } from "@kizmann/pico-js";

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
                return Hash.uuid();
            },
            type: [String]
        },

    },

    data()
    {
        return { uid: Hash.uuid(), visible: false };
    },

    computed: {

        tempFile() {
            return Obj.get(this.file, 'name', this.file);
        }

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
        this.PreviewHandler.create()
            .append(this.$el);

        this.PreviewHandler.append(this);
    },

    beforeUnmount()
    {
        this.$el.remove();

        this.PreviewHandler.remove(this);
    },

    methods: {

        openBox()
        {
            this.PreviewHandler.open(this);
        },

        closeBox()
        {
            this.PreviewHandler.close();
        }

    },

    renderFull()
    {
        let classList = [
            'n-preview-frame'
        ];

        let mime = this.PreviewHelper.getType(this.tempFile);

        if ( mime === 'image' ) {
            return (<NPreviewImage class={classList} src={this.file} />);
        }

        if ( mime === 'video' ) {
            return (<NPreviewVideo class={classList} src={this.file} />);
        }

        let props = {
            showSrc: this.NPreview ? this.NPreview.showSrc : false,
        };

        return (<NPreviewPlain class={classList} src={this.file} {...props} />);
    },

    render()
    {
        if ( ! this.visible ) {
            return null;
        }

        return this.ctor('renderFull')();
    },

}