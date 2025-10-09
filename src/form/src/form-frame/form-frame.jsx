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

        multiple: {
            default()
            {
                return true;
            },
            type: [Boolean]
        }

    },

    data()
    {
        return { search: '', star: '', block: false };
    },

    mounted()
    {
        this.$watch('search', () => {
            this.onSearchInput();
        });

        this.$nextTick(() => {
            this.onScrollEvent();
        });

        this.onMoveEvent();
    },

    methods: {

        applyStar(id, block = false)
        {
            if ( this.block ) {
                return;
            }

            this.block = block;

            if ( ! Any.isEmpty(this.timeout) ) {
                clearTimeout(this.timeout);
            }

            if ( block ) {
                this.star = id;
            }

            this.timeout = setTimeout(() => {
                this.star = id; this.block = false;
            }, 500);
        },

        onMoveEvent()
        {
            Dom.find(window).on('mousemove', Any.debounce(e => {

                let el = Dom.find(e.target).closest('[data-group-key]');

                if ( Any.isEmpty(el) ) {
                    return;
                }

                this.applyStar(Dom.find(el).attr('data-group-key'), true);

            }, 100));
        },

        onScrollEvent()
        {
            Dom.find(this.$el).find('[data-menu-key]').each((el) => {
                Dom.find(el).removeClass(['is-visible', 'is-first']);
            });

            let options = {
                el: `[data-group-key]`, parent: this.$refs.body.$refs.content
            };

            let el = Dom.inviewMaxY(options, (el, index) => {

                let selector = `[data-menu-key="${el.attr}"]`;

                let classList = [
                    'is-visible'
                ];

                if ( index === 0 ) {
                    classList.push('is-first');
                }

                Dom.find(this.$el).find(selector)
                    .addClass(classList);

                this.$refs.menu.scrollIntoView(selector)
            });

            this.applyStar(Dom.find(el).attr('data-group-key'), false);
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

                let labels = Arr.extract(group.items, 'label')
                    .join("\n");

                return Str.lower(group.label + "\n" + labels)
                    .indexOf(search) !== -1;
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

            if ( this.star !== item.key ) {
                this.applyStar(item.key, true);
            }

            this.$refs.body.scrollIntoView(selector, 0, 100);
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
        ];

        if ( this.star === item.key ) {
            classList.push('is-star');
        }

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

        bodyProps['onScrollupdate'] = () => {
            this.onScrollEvent();
        };

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
