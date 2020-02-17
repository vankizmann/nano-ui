export default {

    name: 'NRenderDiv',

    props: {

        value: {
            default()
            {
                return {};
            },
            type: [Object]
        }

    },

    render(h)
    {
        return (
            <div>
                <NInput size="smalls" vModel={this.value.label} />
            </div>
        );
    }

}
