import { Arr, Any, Dom } from "@kizmann/pico-js";
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
                return - 1;
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
            init: false, dragger: 0
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
        if ( !this.$slots.icon && !this.icon ) {
            return null;
        }

        return (
            <div class="n-collapse__header-icon">
                {this.$slots.icon && this.$slots.icon() || <i class={'n-icon ' + this.icon}></i>}
            </div>
        );
    },

    renderHeaderLabel()
    {
        return (
            <div class="n-collapse__header-label">
                {this.$slots.label && this.$slots.label() || <span>{this.label}</span>}
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
        if ( !this.label && !this.$slots.label ) {
            return null;
        }

        let sorted = this.NCollapse.getSorted();

        let classList = [
            'n-collapse__header'
        ];

        if ( Arr.first(sorted)['name'] === this.name ) {
            classList.push('is-first');
        }

        if ( Arr.last(sorted)['name'] === this.name ) {
            classList.push('is-last');
        }

        if ( Arr.has(this.NCollapse.tempValue, this.name) ) {
            classList.push('n-active');
        }

        let props = {
            onClick: () => this.toggleTab(this.name)
        };

        props['onDragenter'] = (event) => {

            this.dragger ++;

            if ( this.dragger !== 1 ) {
                return;
            }

            this.showDelay = setTimeout(() => {
                this.showTab(this.name);
            }, 350);
        };

        props['onDragleave'] = (event) => {

            this.dragger --;

            if ( this.dragger !== 0 ) {
                return;
            }

            clearTimeout(this.showDelay);
        };

        props.style = {
            order: (Arr.find(sorted, { name: this.name })['index'] * 10) + 1
        };

        return (
            <div ref="header" class={classList} {...props}>
                {this.ctor('renderHeaderIcon')()}
                {this.ctor('renderHeaderLabel')()}
                {this.ctor('renderHeaderAngle')()}
            </div>
        );
    },

    renderBody()
    {
        let sorted = this.NCollapse.getSorted();

        let classList = [
            'n-collapse__body'
        ];

        if ( Arr.first(sorted)['name'] === this.name ) {
            classList.push('is-first');
        }

        if ( Arr.last(sorted)['name'] === this.name ) {
            classList.push('is-last');
        }

        let tempValue = Arr.clone(this.NCollapse.tempValue);

        if ( !this.label && !this.$slots.label ) {
            tempValue.push(this.name);
        }

        let renderBody = Arr.has(tempValue, this.name);

        if ( !Arr.has(tempValue, this.name) && this.keep ) {
            renderBody = this.init;
        }

        if ( !Arr.has(tempValue, this.name) && this.preload ) {
            renderBody = true;
        }

        if ( !renderBody && this.label ) {
            return null;
        }

        this.init = true;

        let style = {
            order: (Arr.find(sorted, { name: this.name })['index'] * 10) + 2
        };

        if ( !Arr.has(tempValue, this.name) ) {
            style.display = 'none';
        }

        let element = 'div';

        if ( !this.relative && !this.NCollapse.relative ) {
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
