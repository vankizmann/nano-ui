export default {

    name: 'NEmptyIcon',

    props: {

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

        type: {
            default()
            {
                return 'ufo';
            },
            type: [String]
        },
    },

    render()
    {
        let classList = [
            'n-empty-icon',
            'n-empty-icon--' + this.size,
            'n-empty-icon--' + this.type
        ]

        return (
            <div class={classList}>
                <div class="n-empty-icon__frame">
                    { /* Icon  */ }
                </div>
                <div class="n-empty-icon__text">
                    { this.$slots.default && this.$slots.default() }
                </div>
            </div>
        );
    }

}
