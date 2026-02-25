export default {

    name: 'NButtonGroup',

    props: {

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        }

    },

    render()
    {
        let classList = [
            'n-button-group',
            'n-button-group--' + this.size
        ]
        return (
            <div class={classList}>
                { this.$slots.default && this.$slots.default() }
            </div>
        );
    }

}
