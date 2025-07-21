import { Arr, Any, Dom } from "@kizmann/pico-js";

export default {

    name: 'NFrame',

    inject: {

        NForm: {
            default: undefined
        },

    },

    provide()
    {
        return { NFrame: this };
    },

    data()
    {
        return { inview: [] };
    },

    mounted()
    {
        Any.delay(() => this.onScrollEvent());
    },

    methods: {

        onScrollEvent()
        {
            Dom.find(this.$el).find('[data-menu-key]').each((el) => {
                Dom.find(el).removeClass('is-visible');
            });

            Dom.inviewMaxY(`[data-group-key]`, (el, attr) => {

                let selector = `[data-menu-key="${attr}"]`;

                Dom.find(this.$el).find(selector)
                    .addClass('is-visible');

                this.$refs.menu.scrollIntoView(selector)

            }, this.$el);
        }

    },

    renderMenu(item)
    {
        let labelHtml = (
            <span>{item.label}</span>
        );

        let iconHtml = null;

        if ( item.icon ) {
            iconHtml = (<i class={item.icon} />);
        }

        let buttonProps = {
            href: 'javascript:void(0)'
        }

        buttonProps['onClick'] = () => {

            let selector = `[data-group-key="${item.key}"]`

            if ( item.collapse ) {
                item.openGroup();
            }

            this.$refs.body.scrollIntoView(selector, 50);
        };

        let classList = [
            'n-form-frame__menu',
            'n-form-frame__menu--' + item.type
        ]

        return (
            <a class={classList} data-menu-key={item.key} {...buttonProps}>
                {[iconHtml, labelHtml]}
            </a>
        );
    },

    renderMenus()
    {
        let items = Arr.each(this.NForm.groups, (item) => {
            return this.ctor('renderMenu')(item);
        });

        return (
            <n-scrollbar ref="menu" class="n-form-frame__menus">
                { items } { this.$slots.menu && this.$slots.menu() }
            </n-scrollbar>
        );
    },

    renderBody()
    {
        let bodyProps = {
            //
        };

        bodyProps['onScrollupdate'] = Any.debounce(() => {
            this.onScrollEvent();
        });

        return (
            <n-scrollbar ref="body" class="n-form-frame__body" {...bodyProps}>
                {this.$slots.default && this.$slots.default()}
            </n-scrollbar>
        );
    },

    render()
    {
        let classList = [
            'n-form-frame',
            'n-form-frame--' + this.NForm.size
        ];

        return (
            <div class={classList}>
                {[this.$slots.frame && this.$slots.frame(), this.ctor('renderMenus')(), this.ctor('renderBody')()]}
            </div>
        );
    }
}
