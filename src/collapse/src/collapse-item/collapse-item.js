import { Arr } from "@kizmann/pico-js";
import { h, resolveComponent } from "vue";

export default {

    name: 'NCollapseItem',

    inject: {

        NCollapse: {
            default: undefined
        }

    },

    provide()
    {
        return {
            NCollapseItem: this
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

        showTab()
        {
            this.NCollapse.showTab(this.name);
        },

        hideTab()
        {
            this.NCollapse.hideTab(this.name);
        },

        toggleTab()
        {
            this.NCollapse.toggleTab(this.name);
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
        this.NCollapse.addTab(this);
    },

    beforeUnmount()
    {
        this.NCollapse.removeTab(this);
    },

    renderHeaderIcon()
    {
        if ( ! this.$slots.icon && ! this.icon ) {
            return null;
        }

        return (
            <div class="n-collapse__header-icon">
                { this.$slots.icon && this.$slots.icon() || <i class={this.icon}></i> }
            </div>
        );
    },

    renderHeaderLabel()
    {
        return (
            <div class="n-collapse__header-label">
                { this.$slots.label && this.$slots.label () || <span>{this.label}</span> }
            </div>
        );
    },

    renderHeaderAngle()
    {
        return (
            <div class="n-collapse__header-angle">
                {this.$slots.angle && this.$slots.angle() || <i class={nano.Icons.angleRight}></i>}
            </div>
        );
    },

    renderHeader()
    {
        let classList = [
            'n-collapse__header'
        ];

        if ( Arr.has(this.NCollapse.tempValue, this.name) ) {
            classList.push('n-active');
        }

        let props = {
            onClick: () => this.toggleTab(this.name)
        };

        props['onDragenter'] = () => {
            this.showTab(this.name);
        };

        return (
            <div class={classList} {...props}>
                { this.ctor('renderHeaderIcon')() }
                { this.ctor('renderHeaderLabel')() }
                { this.ctor('renderHeaderAngle')() }
            </div>
        );
    },

    renderBody()
    {
        let classList = [
            'n-collapse__body'
        ];

        let renderBody = Arr.has(this.NCollapse.tempValue, this.name);

        if ( ! Arr.has(this.NCollapse.tempValue, this.name) && this.keep ) {
            renderBody = this.init;
        }

        if ( ! Arr.has(this.NCollapse.tempValue, this.name) && this.preload ) {
            renderBody = true;
        }

        if ( ! renderBody ) {
            return null;
        }

        this.init = true;

        let style = {};

        if ( ! Arr.has(this.NCollapse.tempValue, this.name) ) {
            style.display = 'none';
        }

        let element = 'div';

        if ( ! this.relative && ! this.NCollapse.relative ) {
            element = resolveComponent('NScrollbar');
        }

        return h(element, { class: classList, style, }, this.$slots);
    },

    render()
    {
        return [
            this.ctor('renderHeader')(), this.ctor('renderBody')()
        ];
    }
}
