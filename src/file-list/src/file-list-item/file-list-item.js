import CtorMixin from "../../../mixins/src/ctor";
import { Nano } from "nano-js";

let { Arr, Obj, Str, Any } = Nano;

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
            }
        }

    },

    computed: {

        file()
        {
            return Obj.get({ $value: this.value }, this.NFileList.fileProp);
        },

        done()
        {
            return Obj.get({ $value: this.value }, this.NFileList.doneProp);
        },

        error()
        {
            return Obj.get({ $value: this.value }, this.NFileList.errorProp);
        },

        progress()
        {
            return Obj.get({ $value: this.value }, this.NFileList.progressProp);
        }

    },

    methods: {
        ...CtorMixin
    },

    renderPreview()
    {
        return (
            <span class="fa fad fa-file"></span>
        );
    },

    renderName()
    {
        return (
            <span>{ this.file.name }</span>
        );
    },

    renderMeta()
    {
        return (
            <span>{ Str.filesize(this.file.size) }</span>
        );
    },

    render()
    {
        this.h = h;

        let classList = [
            'n-file-list-item'
        ];

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
                <a class="n-file-list-item__remove" href="javascript:void(0)" vOn:click={() => this.$emit('remove')}>
                    <span class="fa fa-times"></span>
                </a>
            </div>
        );
    }

}
