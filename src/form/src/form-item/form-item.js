import { Arr, Obj, Any, Dom } from "nano-js";

export default {

    name: 'NFormItem',

    inject: {

        NForm: {
            default: undefined
        },

        NTabs: {
            default: undefined
        },

        NTabsItem: {
            default: undefined
        }

    },

    props: {

        prop: {
            default()
            {
                return 'id';
            },
            type: [String]
        },

        label: {
            default()
            {
                return this.$slots.label;
            },
            type: [String]
        },

        tooltip: {
            default()
            {
                return this.$slots.tooltip
            },
            type: [String]
        },

        tooltipPosition: {
            default()
            {
                return 'right-center';
            },
            type: [String]
        }

    },

    methods: {

        focusInput()
        {
            let el = Dom.find(this.$el).find('input');

            if ( el.empty() ) {
                return;
            }

            el.get(0).focus();
        },

        gotoInput()
        {
            let errors = this.NForm.errors;

            if ( Any.isEmpty(errors) ) {
                return;
            }

            if ( ! this.NTabs || ! this.NTabsItem ) {
                return;
            }

            let keys = Any.keys(errors);

            if ( Arr.first(keys) !== this.prop ) {
                return;
            }

            this.NTabs.changeTab(this.NTabsItem.name);
        }

    },

    beforeMount()
    {
        this.NForm.addItem(this);
    },

    mounted()
    {
        this.NForm.$on('errors', this.gotoInput);
    },

    render(h)
    {
        return <div class="n-form-item">
            { (this.label || this.$slots.label) &&
                <div class="n-form-item__label">
                    <label vOn:click={this.focusInput}>{this.label}</label>
                    { this.tooltip && <NPopover type="tooltip" position={this.tooltipPosition}>{ this.tooltip }</NPopover> }
                </div>
            }
            <div class="n-form-item__input">
                { this.$slots.default }
            </div>
            <div class="n-form-item__error">
                { Obj.get(this.NForm.errors, this.prop) }
            </div>
        </div>;
    }
}
