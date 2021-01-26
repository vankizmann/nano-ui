import { Arr, Obj, Any, Dom, UUID } from "@kizmann/pico-js";

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
                return '';
            },
            type: [String]
        },

        tooltip: {
            default()
            {
                return '';
            },
            type: [String]
        },

        tooltipPosition: {
            default()
            {
                return 'bottom-start';
            },
            type: [String]
        },

        tooltipWindow: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

    },

    methods: {

        focusInput()
        {
            let $input = Dom.find(this.$el).find('input');

            if ( ! $input.empty() ) {
                return $input.get(0).focus();
            }

            $input = Dom.find(this.$refs.input).childs();

            if ( ! $input.empty() ) {
                return $input.get(0).click();
            }

            console.log('I dont belong here :o');
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

    data()
    {
        return {
            uid: UUID()
        };
    },

    beforeMount()
    {
        this.NForm.addItem(this);
    },

    mounted()
    {
        // this.NForm.$on('errors', this.gotoInput);
    },

    beforeUnmount()
    {
        this.NForm.removeItem(this);
    },

    renderTooltip()
    {
        if ( ! this.tooltip && ! this.$slots.tooltip ) {
            return null;
        }

        let props = {
            position: this.tooltipPosition,
        };

        return (
            <NPopover type="tooltip" {...props}>
                { this.$slots.tooltip && this.$slots.tooltip() || this.tooltip }
            </NPopover>
        );
    },

    renderLabel()
    {
        if ( ! this.label && ! this.$slots.label ) {
            return null;
        }

        let labelHtml = (
            <div class="n-form-item__label">
                <label onClick={this.focusInput}>
                    { this.$slots.label && this.$slots.label() || this.label }
                </label>
            </div>
        );

        return [
            labelHtml, this.ctor('renderTooltip')()
        ]
    },

    renderError()
    {
        if ( ! Obj.has(this.NForm.errors, this.prop) ) {
            return null;
        }

        return (
            <div class="n-form-item__error">
                { Obj.get(this.NForm.errors, this.prop) }
            </div>
        );
    },

    renderInput()
    {
        return (
            <div ref="input" class="n-form-item__input">
                { this.$slots.default && this.$slots.default() }
            </div>
        );
    },

    render()
    {
        return <div class="n-form-item">
            { this.ctor('renderLabel')() }
            { this.ctor('renderInput')() }
            { this.ctor('renderError')() }
        </div>;
    }
}
