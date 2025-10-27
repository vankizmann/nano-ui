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
            }
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
            slots[1] = (<li>{ this.file }</li>);
        }

        return (
            <div class={classList}>
                <ul>{ slots }</ul>
            </div>
        );
    }

}