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
                return 'default';
            },
            type: [String]
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        }

    },

    render()
    {
        let classList = [
            'n-empty-icon',
            'n-empty-icon--' + this.size,
            'n-empty-icon--' + this.type
        ];

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

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
