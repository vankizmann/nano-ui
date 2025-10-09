import { Arr, Obj, Any, Dom, UUID, Locale } from "@kizmann/pico-js";

export default {

    name: 'NFormItem',

    inject: {

        NTabs: {
            default: undefined
        },

        NForm: {
            default: undefined
        },

        NFormGroup: {
            default: undefined
        },

        NTabsItem: {
            default: undefined
        }

    },

    provide()
    {
        return { NFormItem: this };
    },

    props: {

        modelValue: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

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

        size: {
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

        conditional: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        conditionOn: {
            default()
            {
                return Locale.trans('Enable field');
            },
            type: [String]
        },

        conditionOff: {
            default()
            {
                return Locale.trans('Disable field');
            },
            type: [String]
        }

    },

    methods: {

        enabled(component = false)
        {
            return (! this.conditional || this.modelValue) && ! component;
        },

        disabled(component)
        {
            return (this.conditional && ! this.modelValue) || component;
        },

        toggleCondition()
        {
            this.$emit('update:modelValue', !this.modelValue);
        },

        focusInput()
        {
            let $input = Dom.find(this.$el).find('input');

            if ( !$input.empty() ) {
                return $input.get(0).focus();
            }

            $input = Dom.find(this.$refs.input).childs();

            if ( !$input.empty() ) {
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

            if ( !this.NTabs || !this.NTabsItem ) {
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
        if ( this.NFormGroup ) {
            this.NFormGroup.appendItem(this);
        }
    },

    mounted()
    {
        if ( this.NForm ) {
            this.NForm.$watch('errors', this.gotoInput, { deep: true });
        }
    },

    beforeUnmount()
    {
        if ( this.NFormGroup ) {
            this.NFormGroup.removeItem(this);
        }
    },

    renderTooltip()
    {
        if ( !this.tooltip && !this.$slots.tooltip ) {
            return null;
        }

        let props = {
            size: 'sm',
            position: this.tooltipPosition,
        };

        return (
            <NPopover type="tooltip" {...props}>
                {this.$slots.tooltip && this.$slots.tooltip() || this.tooltip}
            </NPopover>
        );
    },

    renderCondition()
    {
        if ( ! this.conditional ) {
            return null;
        }

        return (
            <div class="n-form-item__condition" onClick={this.toggleCondition}>
                <span>{ this.modelValue ? this.conditionOff : this.conditionOn }</span>
            </div>
        );
    },

    renderLabel()
    {
        if ( !this.label && !this.$slots.label ) {
            return null;
        }

        let labelHtml = (
            <div class="n-form-item__label">
                <label onClick={this.focusInput}>
                    {this.$slots.label && this.$slots.label() || this.label}
                </label>
            </div>
        );

        return [
            labelHtml, this.ctor('renderTooltip')()
        ]
    },

    renderError()
    {
        if ( !this.NForm || !Obj.has(this.NForm.errors, this.prop) ) {
            return null;
        }

        return (
            <div class="n-form-item__error">
                {Obj.get(this.NForm.errors, this.prop)}
            </div>
        );
    },

    renderInput()
    {
        return (
            <div ref="input" class="n-form-item__input">
                {this.$slots.default && this.$slots.default()}
            </div>
        );
    },

    render()
    {
        let size = this.size || Obj.get(this.NForm, 'size', 'md');


        let classList = [
            'n-form-item',
            'n-form-item--' + size,
        ];

        if ( this.disabled() ) {
            classList.push('is-disabled');
        }

        return <div class={classList}>
            {this.ctor('renderCondition')()}
            {this.ctor('renderLabel')()}
            {this.ctor('renderInput')()}
            {this.ctor('renderError')()}
        </div>;
    }
}
