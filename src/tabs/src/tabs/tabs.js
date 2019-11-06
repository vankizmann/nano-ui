import { UUID, Num, Arr, Obj, Any, Dom, Locale } from "nano-js";

export default {

    name: 'NTabs',

    model: {
        prop: 'current'
    },

    props: {

        current: {
            default()
            {
                return 'default';
            },
            type: [String]
        }

    },

    methods: {

        getTab()
        {
            let isset = Arr.find(this.tabs, {
                name: this.current
            });

            if ( isset !== null ) {
                return this.nativeCurrent = this.current;
            }

            let tab = Arr.first(this.tabs);

            this.nativeCurrent = tab.name
        },

        addTab(tab)
        {
            this.tabs.push(tab);
        },

        removeTab(tab)
        {
            Arr.remove(this.tabs, {
                _uid: tab._uid
            });
        },

        changeTab(tab)
        {
            this.$emit('input', this.nativeCurrent = tab);
        }

    },

    provide()
    {
        return {
            NTabs: this
        };
    },

    data()
    {
        return {
            width: 0, offset: 0, tabs: [], nativeCurrent: this.current
        };
    },

    watch: {

        tabs: {
            handler: 'getTab'
        }

    },

    updated()
    {
        let width = Dom.find(this.$el)
            .find('.n-tabs__tab--current').width();

        this.width = width < 0 ? 0 : width;

        let offset = Dom.find(this.$el)
            .find('.n-tabs__tab--current').offsetLeft(this.$el);

        this.offset = offset < 0 ? 0 : offset;
    },

    render()
    {
        let style = {
            maxWidth: this.width + 'px', left: this.offset + 'px'
        };

        return (
            <div class="n-tabs">
                { this.tabs.length > 1 &&
                    <div class="n-tabs__header">
                        <div class="n-tabs__header-inner">
                            {
                                Arr.each(Arr.sort(this.tabs, 'sort'), (tab) => {

                                    let className = [
                                        'n-tabs__tab'
                                    ];

                                    if ( this.nativeCurrent === tab.name ) {
                                        className.push('n-tabs__tab--current');
                                    }

                                    return (
                                        <div class={className} vOn:click={() => this.changeTab(tab.name)}>
                                            { tab.icon &&
                                                <div class="n-tabs__tab-icon">
                                                    <span class={tab.icon}></span>
                                                </div>
                                            }
                                            <div class="n-tabs__tab-label">
                                               <span>{ tab.$slots.label || tab.label }</span>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            <div class="n-tabs__indicator" style={style}>
                                <span></span>
                            </div>
                        </div>
                    </div>
                }
                <div class="n-tabs__body">
                    { this.$slots.default }
                </div>
            </div>
        );
    }
}
