import { Obj, Arr, Any, Dom } from "nano-js";

export default {

    name: 'NPopoverOption',

    inject: {
        NPopover: {
            default: undefined
        }
    },

    props: {

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        },

        focus: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        active: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        icon: {
            default()
            {
                return '';
            },
            type: [String]
        },

        clickClose: {
            default()
            {
                return true;
            },
            type: [Boolean]
        }


    },

    computed: {

        size()
        {
            return this.NPopover.size;
        }

    },

    methods: {

        onClick(event)
        {
            if ( this.clickClose ) {
                this.NPopover.close();
            }
        }

    },

    render()
    {
        let classList = [
            'n-popover-option',
            'n-popover-option--' + this.type,
            'n-popover-option--' + this.size,
        ];

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        let props = Obj.clone(this.$attrs);

        if ( ! this.disabled ) {
            props.onClick = this.onClick;
        }

        if ( this.disabled ) {
            props.disabled = true;
        }

        return (
            <a class={classList} href="javascript:void(0)" {...props}>
                <span>{ this.$slots.default() }</span>
            </a>
        );
    }

}
