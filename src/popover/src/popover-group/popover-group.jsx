export default {

    name: 'NPopoverGroup',

    inject: {
        NPopover: {
            default: undefined
        }
    },

    props: {

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },


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

    render()
    {
        let classList = [
            'n-popover-group',
            'n-popover-group--' + this.tempSize,
        ];

        return (
            <label class={classList}>
                <span>{ this.$slots.default() }</span>
            </label>
        );
    }

}
