import { h, resolveComponent } from "vue";

export default {

    name: 'NTabsItem',

    inject: {

        NTabs: {
            default: undefined
        }

    },

    provide()
    {
        return {
            NTabsItem: this
        };
    },

    props: {

        label: {
            default()
            {
                return '';
            },
            type: [String]
        },

        name: {
            default()
            {
                return 'default';
            },
            type: [String]
        },

        icon: {
            default()
            {
                return '';
            },
            type: [String]
        },

        sort: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        relative: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        preload: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        keep: {
            default()
            {
                return false;
            },
            type: [Boolean]
        }


    },

    methods: {

        changeTab()
        {
            this.NTabs.changeTab(this.name);
        }

    },

    data()
    {
        return {
            _key: null, init: false
        }
    },

    beforeMount()
    {
        this.NTabs.addTab(this);
    },

    beforeUnmount()
    {
        this.NTabs.removeTab(this);
    },

    renderHeaderIcon()
    {
        if ( ! this.$slots.icon && ! this.icon ) {
            return null;
        }

        return (
            <div class="n-tabs__tab-icon">
                { this.$slots.icon && this.$slots.icon() || <i class={this.icon}></i> }
            </div>
        );
    },

    renderHeaderLabel()
    {
        return (
            <div class="n-tabs__tab-label">
                { this.$slots.label && this.$slots.label () || <span>{this.label}</span> }
            </div>
        );
    },

    renderHeader()
    {
        let classList = [
            'n-tabs__tab'
        ];

        if ( this.NTabs.tempValue === this.name ) {
            classList.push('n-active');
        }

        let props = {
            onClick: () => this.changeTab(this.name)
        };

        return (
            <div class={classList} {...props}>
                { this.ctor('renderHeaderIcon')() }
                { this.ctor('renderHeaderLabel')() }
            </div>
        );
    },

    render()
    {
        let renderBody = this.NTabs.tempValue === this.name;

        if ( this.NTabs.tempValue !== this.name && this.keep ) {
            renderBody = this.init;
        }

        if ( this.NTabs.tempValue !== this.name && this.preload ) {
            renderBody = true;
        }

        if ( ! renderBody ) {
            return null;
        }

        this.init = true;

        let classList = [
            'n-tabs-item'
        ];

        let style = {};

        if ( this.NTabs.tempValue !== this.name ) {
            style.display = 'none';
        }

        if ( this.$slots.raw ) {
            return this.$slots.raw();
        }

        let element = 'div';

        if ( ! this.relative && ! this.NTabs.relative ) {
            element = resolveComponent('NScrollbar');
        }

        return h(element, { class: classList, style }, [
            this.$slots.default && this.$slots.default()
        ]);
    }
}
