import { Any, Obj, Locale } from "@kizmann/pico-js";

export default {

    name: 'NPreviewPlain',

    props: {

        src: {
            default()
            {
                return null;
            }
        },

        showSrc: {
            default()
            {
                return true;
            },
            type:  [Boolean]
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
            type:  [Boolean]
        }

    },

    computed: {

        file() {
            return Obj.get(this.src, 'name', this.src);
        }

    },

    render()
    {
        let classList = [
            'n-preview-plain'
        ];

        let slots = [];

        slots[0] = (
            <li>{ this.PreviewHelper.getMime(this.file) }</li>
        );

        if ( this.showSrc ) {
            slots.push(<li class="np-file">{ this.file }</li>);
        }

        let buttonProps = {
            nativeType: 'a', href: this.file, target: '_blank'
        };

        let buttonHtml = (
            <li class="np-button">
                <NButton {...buttonProps}>{ this.buttonText }</NButton>
            </li>
        );

        if ( this.renderButton ) {
            slots.push(buttonHtml);
        }

        return (
            <div class={classList}>
                <ul>{ slots }</ul>
            </div>
        );
    }

}