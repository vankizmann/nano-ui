export default {

    name: 'NButtonGroup',

    render()
    {
        return <div class="n-button-group">
            { this.$slots.default }
        </div>;
    }

}
