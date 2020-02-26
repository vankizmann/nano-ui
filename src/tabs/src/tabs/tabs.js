import { Arr, Dom } from "nano-js";

export default {

    name: 'NTabs',

    provide()
    {
        return {
            NTabs: this
        };
    },

    props: {

        value: {
            default()
            {
                return 'default';
            },
            type: [String]
        }

    },

    data()
    {
        return {
            width: 0, offset: 0, veTabs: [], veValue: this.value
        };
    },

    methods: {

        addTab(tab)
        {
            Arr.add(this.veTabs, tab, {
                name: tab.name
            });
        },

        removeTab(tab)
        {
            Arr.remove(this.veTabs, {
                name: tab.name
            });
        },

        getTab()
        {
            let currentTab = Arr.find(this.veTabs, {
                name: this.current
            });

            if ( ! currentTab ) {
                currentTab = Arr.first(this.veTabs);
            }

            if ( currentTab.name === this.veValue ) {
                return;
            }

            this.$emit('input', this.veValue = currentTab.name);
        },

        changeTab(tab)
        {
            this.$emit('input', this.veValue = tab);
        }

    },

    watch: {

        value()
        {
            if ( this.value !== this.veValue ) {
                this.veValue = this.value;
            }
        }

    },

    mounted()
    {
        this.getTab();
    },

    updated()
    {
        let width = Dom.find(this.$el).find('.n-active')
            .width();

        this.width = width < 0 ? 0 : width;

        let offset = Dom.find(this.$el).find('.n-active')
            .offset('left', this.$el);

        this.offset = offset < 0 ? 0 : offset;
    },

    renderHeaderIndicator()
    {
        let style = {
            maxWidth: this.width + 'px',
            left: this.offset + 'px'
        };

        return (
            <div class="n-tabs__indicator" style={style}>
                <span></span>
            </div>
        );
    },

    renderHeader()
    {
        if ( this.veTabs.length <= 1 ) {
            return null;
        }

        let headerItems = Arr.each(Arr.sort(this.veTabs, 'sort'), (tab) => {
            return tab.ctor('renderHeader')()
        });

        return (
            <div class="n-tabs__header">
                <div class="n-tabs__header-inner">
                    { [headerItems, this.ctor('renderHeaderIndicator')()] }
                </div>
            </div>
        );
    },

    renderBody()
    {
        return (
            <div class="n-tabs__body">
                {this.$slots.default}
            </div>
        );
    },

    render()
    {

        return (
            <div class="n-tabs">
                { this.ctor('renderHeader')() }
                { this.ctor('renderBody')() }
            </div>
        );
    }
}
