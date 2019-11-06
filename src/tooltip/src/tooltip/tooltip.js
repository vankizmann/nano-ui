import { Nano } from "nano-js";

let { UUID, Num, Obj, Any, Locale } = Nano;

export default {

    name: 'NTooltip',

    props: {

        selector: {
            default()
            {
                return null;
            },
        },

        trigger: {
            default()
            {
                return 'hover';
            },
            type: [String]
        },

        position: {
            default()
            {
                return 'bottom-center';
            }
        },

        visible: {
            default()
            {
                return false;
            },
            type: [Boolean]
        }

    },

    render(h)
    {
        return h('NPopover', {
            class: 'n-tooltip', props: this.$props
        }, this.$slots.default);
    }
}
