import { Arr, Obj, Any } from "nano-js";

export default {

    name: 'NCheckbox',

    model: {
        prop: 'checked'
    },

    inject: {

        NCheckboxGroup: {
            default: undefined
        }

    },

    props: {

        value: {
            default()
            {
                return null;
            }
        },

        checked: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        size: {
            default()
            {
                return 'default';
            },
            type: [String]
        },

        intermediate: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        global: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

    },

    computed: {

        veComputed()
        {
            return ! this.global ? this.veChecked :
                this.NCheckboxGroup.globalChecked;
        },

        veIntermediate()
        {
            return ! this.global ? this.intermediate :
                this.NCheckboxGroup.globalIntermediate;
        },

        veDisabled()
        {
            return ! this.global ? this.disabled :
                this.NCheckboxGroup.globalDisabled;
        }

    },

    data()
    {
        return {
            veChecked: this.checked
        };
    },

    methods: {

        toggle()
        {
            this.$emit('input', this.veChecked = ! this.veChecked);
        },

        check()
        {
            if ( this.NCheckboxGroup ) {
                this.NCheckboxGroup.checkCheckbox(this);
            }

            this.$emit('input', this.veChecked = true);
        },

        uncheck()
        {
            if ( this.NCheckboxGroup ) {
                this.NCheckboxGroup.uncheckCheckbox(this);
            }

            this.$emit('input', this.veChecked = false);
        },

        eventLocalClick(event)
        {
            if ( this.NCheckboxGroup ) {
                event.shiftKey ? this.NCheckboxGroup.shiftCheckbox(this) :
                    this.NCheckboxGroup.toggleCheckbox(this);
            }

            this.$emit('input', this.veChecked = ! this.veChecked);
        },

        eventGlobalClick()
        {
            this.NCheckboxGroup.toggleAll();
        },

    },

    watch: {

        checked()
        {
            if ( this.checked !== this.veChecked ) {
                this.veChecked = this.checked;
            }
        }

    },

    beforeMount()
    {
        if ( this.NCheckboxGroup ) {
            this.veChecked = this.NCheckboxGroup.isChecked(this.value);
        }
    },

    mounted()
    {
        if ( ! this.NCheckboxGroup || this.global ) {
            return;
        }

        this.NCheckboxGroup.$watch('veValue', () => {
            this.veChecked = this.NCheckboxGroup.isChecked(this.value);
        });

        this.NCheckboxGroup.addCheckbox(this);
    },

    beforeDestroy()
    {
        if ( this.NCheckboxGroup && ! this.global ) {
            this.NCheckboxGroup.removeCheckbox(this);
        }
    },

    renderCheckbox()
    {
        let interHtml = this.$slots.intermediate;

        if ( ! interHtml )  {
            interHtml = (<span class={this.icons.intermediate}></span>);
        }

        let checkHtml = this.$slots.checked;

        if ( ! checkHtml )  {
            checkHtml = (<span class={this.icons.checked}></span>);
        }

        return (
            <div class="n-checkbox__checkbox">
                { this.veIntermediate ? interHtml : checkHtml }
            </div>
        );
    },

    renderLabel()
    {
        if ( ! this.$slots.default && ! this.$slots.label ) {
            return null;
        }

        return (
            <div class="n-checkbox__label">
                { this.$slots.default || this.$slots.label }
            </div>
        );
    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-checkbox',
            'n-checkbox--' + this.size
        ];

        if ( this.veComputed ) {
            classList.push('n-checked');
        }

        if ( this.veIntermediate ) {
            classList.push('n-intermediate');
        }

        if ( this.veDisabled ) {
            classList.push('n-disabled');
        }

        let events = {};

        if ( ! this.veDisabled ) {
            events = Obj.clone(this.$listeners);
        }

        if ( ! this.veDisabled && this.global ) {
            events.click = this.eventGlobalClick;
        }

        if ( ! this.veDisabled && ! this.global ) {
            events.click = this.eventLocalClick;
        }

        return (
            <div class={classList} on={events}>
                { this.ctor('renderCheckbox')() }
                { this.ctor('renderLabel')() }
            </div>
        );
    }

}
