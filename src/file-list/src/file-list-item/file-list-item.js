import CtorMixin from "../../../mixins/src/ctor";
import { Arr, Obj, Str, Any } from "nano-js";

export default {

    name: 'NFileListItem',

    inject: {

        NFileList: {
            default: undefined
        }

    },

    props: {

        value: {
            default()
            {
                return {};
            },
            type: [Object]
        },

        renderPreview: {
            default()
            {
                return false;
            },
            type: [Boolean]
        }

    },

    computed: {

        file()
        {
            return Obj.get(this.value, this.NFileList.fileProp);
        },

        done()
        {
            return Obj.get(this.value, this.NFileList.doneProp);
        },

        error()
        {
            return Obj.get(this.value, this.NFileList.errorProp);
        },

        progress()
        {
            return Obj.get(this.value, this.NFileList.progressProp);
        },

        exceed()
        {
            return this.fileLimit &&
                this.value.file.size > this.fileLimit;
        }

    },

    methods: {

        remove()
        {
            this.NFileList.removeFile(this.value);
        }

    },

    data()
    {
        return {
            classList: []
        };
    },

    renderPreview()
    {
        return (
            <span class="fa fad fa-file"></span>
        );
    },

    renderName()
    {
        if ( ! this.file ) {
            return null;
        }

        return (
            <span>{ this.file.name }</span>
        );
    },

    renderMeta()
    {
        let body = Str.filesize(this.file.size);

        if ( ! this.file ) {
            return null;
        }

        let limit = { size: this.fileLimit / 1000 };

        if ( this.exceed ) {
            body = this.trans('File exceeds filelimit of :size mb', limit);
        }

        return (
            <span>{ body }</span>
        );
    },

    render($render)
    {
        this.$render = $render;

        let classList = Arr.merge(['n-file-list-item'],
            this.classList);

        if ( this.exceed === true ) {
            classList.push('n-file-list-item--exceed');
        }

        if ( this.done === true ) {
            classList.push('n-file-list-item--done');
        }

        if ( this.error === true ) {
            classList.push('n-file-list-item--error');
        }

        return (
            <div class={classList}>
                <div class="n-file-list-item__preview">
                    <div class="n-file-list-item__preview-inner">
                        { this.ctor('renderPreview')() }
                    </div>
                    { this.NFileList.useProgress &&
                        <div class="n-file-list-item__progress">
                            <span style={{ width: this.progress + '%' }}></span>
                        </div>
                    }
                </div>
                <div class="n-file-list-item__name">
                    <div class="n-file-list-item__name-inner">
                        { this.ctor('renderName')() }
                    </div>
                </div>
                <div class="n-file-list-item__meta">
                    <div class="n-file-list-item__meta-inner">
                        { this.ctor('renderMeta')() }
                    </div>
                </div>
                <a class="n-file-list-item__remove" href="javascript:void(0)" vOn:click={this.remove}>
                    <span class={this.icons.times}></span>
                </a>
            </div>
        );
    }

}
