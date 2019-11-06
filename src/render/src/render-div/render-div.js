export default {

    name: 'NRenderDiv',

    render(h)
    {
        return h('div', { attrs: this.$attrs }, this.$slots.default);
    }

}
