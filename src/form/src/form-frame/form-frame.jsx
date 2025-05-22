import { Arr, Obj, Any, Dom, UUID, Locale } from "@kizmann/pico-js";

export default {

    name: 'NFrame',

    provide()
    {
        return { NFrame: this };
    },

    props: {

        resize: {
            default() {
                return false;
            },
            type: [Boolean]
        },

        scrollbar: {
            default() {
                return false;
            },
            type: [Boolean]
        }

    },

    render()
    {
        let classList = [
            'n-frame'
        ];

        return (
            <div class={classList}>
                {this.$slots.default && this.$slots.default()}
            </div>
        );
    }
}
