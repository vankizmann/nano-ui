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

        size: {
            default()
            {
                return 'md';
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

        iconPosition: {
            default()
            {
                return 'before';
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

        tempSize()
        {
            if ( this.NPopover ) {
                return this.NPopover.size;
            }

            return this.size;
        }

    },

    methods: {

        onClick(event)
        {
            if ( this.NPopover && this.clickClose ) {
                this.NPopover.close();
            }

            this.$emit('click', event);
        }

    },

    renderIcon()
    {
        if ( ! this.icon ) {
            return null;
        }

        let classList = [
            'n-icon', 
            'n-icon--' + this.iconPosition,
        ];

        classList.push(this.icon);

        return (<i class={classList}></i>);
    },

    render()
    {
        let classList = [
            'n-popover-option',
            'n-popover-option--' + this.type,
            'n-popover-option--' + this.tempSize,
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
                <span>{ this.$slots.default() }</span> { this.ctor('renderIcon')() }
            </a>
        );
    }

}
