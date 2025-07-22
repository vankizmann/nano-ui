import { Arr, Any, Dom, Str, Locale } from "@kizmann/pico-js";

export default {

    name: 'NFormFrame',

    inject: {

        NForm: {
            default: undefined
        },

    },

    provide()
    {
        return { NFormFrame: this };
    },

    props: {

        showSearch: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        searchPlaceholder: {
            default()
            {
                return Locale.trans('Search ...');
            },
            type: [String]
        },

        searchIcon: {
            default()
            {
                return 'fa fa-times';
            },
            type: [String]
        },

        kind: {
            default()
            {
                return '';
            },
            type: [String]
        },

    },

    data()
    {
        return { search: '' };
    },

    mounted()
    {
        this.$watch('search', () => {
            this.onSearchInput();
        });

        this.$nextTick(() => {
            this.onScrollEvent();
        });
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
        },

        onSearchInput()
        {
            let search = Str.lower(this.search);

            Dom.find(this.$el).find(`[data-menu-key]`)
                .removeClass('on-search');

            if ( Any.isEmpty(search) ) {
                return;
            }

            let groups = Arr.filter(this.NForm.groups, (group) => {
                return Str.lower(group.label).indexOf(search) !== -1;
            });

            Arr.each(groups, (group) => {
                Dom.find(this.$el).find(`[data-menu-key="${group.key}"]`).addClass('on-search');
            });
        },

        onClickEvent(item, event = null)
        {
            if ( ! Any.isEmpty(event) ) {
                event.preventDefault();
            }

            let selector = `[data-group-key="${item.key}"]`

            if ( item.collapse ) {
                item.openGroup();
            }

            if ( ! Any.isEmpty(this.timeout) ) {
                clearTimeout(this.timeout);
            }

            Dom.find('[data-group-key]').removeClass('on-search');

            this.timeout = setTimeout(() => {
                Dom.find(selector).removeClass('on-search');
            }, 4000);

            this.$nextTick(() => {
                Dom.find(selector).addClass('on-search');
            });

            this.$refs.body.scrollIntoView(selector)
        }

    },

    renderSearch()
    {
        if ( ! this.showSearch ) {
            return null;
        }

        let searchProps = {
            placeholder: this.searchPlaceholder
        };

        if ( ! Any.isEmpty(this.search) ) {
            searchProps.icon = this.searchIcon;
        }

        searchProps['onIconClick'] = () => {
            this.search = '';
        }

        return (
            <div class="n-form-frame__search">
                <NInput vModel={this.search} {...searchProps}></NInput>
            </div>
        )
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
            href: '#' + item.key
        }

        buttonProps['onClick'] = (e) => {
            this.onClickEvent(item, e)
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
                { this.ctor('renderSearch')() } { items } { this.$slots.menu && this.$slots.menu() }
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

        if ( ! Any.isEmpty(this.search) ) {
            classList.push('n-form-frame--search')
        }

        return (
            <div class={classList}>
                {[this.$slots.frame && this.$slots.frame(), this.ctor('renderMenus')(), this.ctor('renderBody')()]}
            </div>
        );
    }
}
