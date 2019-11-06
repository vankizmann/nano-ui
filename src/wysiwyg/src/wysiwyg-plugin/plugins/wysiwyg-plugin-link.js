import NWysiwygPlugin from "../wysiwyg-plugin";
import Link from "../extensions/link";
import { Nano } from "nano-js";

let { Obj } = Nano;


export default {

    name: 'NWysiwygPluginLink',

    extends: NWysiwygPlugin,

    computed: {

        active()
        {
            return this.editor.isActive.link();
        }

    },

    data()
    {
        return {
            value: {}, visible: false
        };
    },

    methods: {

        toggleLinkState()
        {
            this.value = Obj.assign({}, this.getMarkAttrs('link'));

            this.visible = true;
        },

        confirmLinkState()
        {
            this.editor.commands.link(this.value);

            this.visible = false;
        },

        removeLinkState()
        {
            this.editor.commands.link({ href: null });

            this.visible = false;
        }

    },

    created()
    {
        this.NWysiwyg.addExtension(new Link);
    },

    render()
    {
        return (
            <div>
                <NButton square={true} icon="fa fa-link" vOn:click={this.toggleLinkState} />
                <NModal vModel={this.visible} selector={false}>
                    <NForm>
                        <NFormItem label={this.trans('URL')}>
                            <NInput placeholder={this.trans('http://google.com')} vModel={this.value.href} />
                        </NFormItem>
                        <NFormItem label={this.trans('Target')}>
                            <NSelect vModel={this.value.target}>
                                <NSelectOption value="_self">{ this.trans('Same window') }</NSelectOption>
                                <NSelectOption value="_blank">{ this.trans('New window') }</NSelectOption>
                            </NSelect>
                        </NFormItem>
                    </NForm>
                    <div slot="footer">
                        <NButton type="primary" vOn:click={this.confirmLinkState}>{ this.trans('Confirm') }</NButton>
                        <NButton type="danger" vOn:click={this.removeLinkState}>{ this.trans('Remove') }</NButton>
                    </div>
                </NModal>
            </div>
        );
    }

}