import { Arr, Obj, Any, Dom, UUID, Locale } from "@kizmann/pico-js";

export default {

    name: 'NFormItem',

    inject: {

        NForm: {
            default: undefined
        },

        NFormGroup: {
            default: undefined
        },

        NTabs: {
            default: undefined
        },

        NTabsItem: {
            default: undefined
        },

        NCollapse: {
            default: undefined
        },

        NCollapseItem: {
            default: undefined
        },

        NScrollbar: {
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

        rules: {
            default()
            {
                return [];
            },
            type: [Array]
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

    data()
    {
        return {
            uid: UUID()
        };
    },

    beforeMount()
    {
        if ( this.NForm ) {
            this.NForm.appendItem(this);
        }

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
        if ( this.NForm ) {
            this.NForm.removeItem(this);
        }

        if ( this.NFormGroup ) {
            this.NFormGroup.removeItem(this);
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
            let selector = `[data-form-field="${this.uid}"]`;

            if ( this.NTabsItem ) {
                this.NTabsItem.changeTab();
            }

            if ( this.NCollapseItem ) {
                this.NCollapseItem.showTab();
            }

            if ( this.NScrollbar ) {
                this.NScrollbar.scrollIntoView(selector, 0, 50);
            }

            console.log(this.NScrollbar)
        }

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

        return (
            <div class="n-form-item__label">
                <label onClick={this.focusInput} data-tooltip-ltr={this.tooltip} data-required={Arr.has(this.rules, 'required')}>
                    {this.$slots.label && this.$slots.label() || this.label}
                </label>
            </div>
        );
    },

    renderError()
    {
        if ( !this.NForm ) {
            return null;
        }

        let errors = Obj.get(this.NForm.getErrors(),
            this.prop, []);

        if ( Any.isEmpty(errors) ) {
            return;
        }

        return (
            <div class="n-form-item__error">
                {Arr.first(errors)}
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

        return <div class={classList} data-form-field={this.uid}>
            {this.ctor('renderCondition')()}
            {this.ctor('renderLabel')()}
            {this.ctor('renderInput')()}
            {this.ctor('renderError')()}
        </div>;
    }
}
