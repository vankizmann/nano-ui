import { Any } from "nano-js";

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
                return this._uid;
            },
            type: [Number]
        },

        preload: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        raw: {
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
            veInit: false
        }
    },

    beforeMount()
    {
        this.NTabs.addTab(this);
    },

    beforeDestroy()
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
                { this.$slots.icon || <span class={this.icon}></span> }
            </div>
        );
    },

    renderHeaderLabel()
    {
        return (
            <div class="n-tabs__tab-label">
                { this.$slots.label || <span>{this.label}</span> }
            </div>
        );
    },

    renderHeader()
    {
        let classList = [
            'n-tabs__tab'
        ];

        if ( this.NTabs.veValue === this.name ) {
            classList.push('n-active');
        }

        let events = {
            click: () => this.changeTab(this.name)
        };

        return (
            <div class={classList} on={events}>
                { this.ctor('renderHeaderIcon')() }
                { this.ctor('renderHeaderLabel')() }
            </div>
        );
    },

    render()
    {
        let renderBody = this.NTabs.veValue === this.name;

        if ( this.NTabs.veValue !== this.name && this.keep ) {
            renderBody = this.veInit;
        }

        if ( this.NTabs.veValue !== this.name && this.preload ) {
            renderBody = true;
        }

        if ( ! renderBody ) {
            return null;
        }

        if ( this.raw === true ) {
            return this.$slots.default;
        }

        this.veInit = true;

        let classList = [
            'n-tabs-item'
        ];

        let style = {};

        if ( this.NTabs.veValue !== this.name ) {
            style.display = 'none';
        }

        return (
            <div class={classList} style={style}>
                { this.$slots.default }
            </div>
        );
    }
}
