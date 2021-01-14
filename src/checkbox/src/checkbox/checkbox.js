import { Arr, Obj, Any } from "nano-js";

export default {

    name: 'NCheckbox',

    inject: {

        NCheckboxGroup: {
            default: undefined
        }

    },

    props: {

        modelValue: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        value: {
            default()
            {
                return null;
            }
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        },

        size: {
            default()
            {
                return 'md';
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

        tempComputed()
        {
            return ! this.global ? this.tempChecked :
                this.NCheckboxGroup.globalChecked;
        },

        tempIntermediate()
        {
            return ! this.global ? this.intermediate :
                this.NCheckboxGroup.globalIntermediate;
        },

        tempDisabled()
        {
            return ! this.global ? this.disabled :
                this.NCheckboxGroup.globalDisabled;
        }

    },

    data()
    {
        return {
            tempChecked: this.modelValue
        };
    },

    watch: {

        modelValue(value)
        {
            if ( value !== this.tempChecked ) {
                this.tempChecked = value;
            }
        }

    },

    beforeMount()
    {
        if ( this.NCheckboxGroup ) {
            this.tempChecked = this.NCheckboxGroup.isChecked(this.value);
        }
    },

    mounted()
    {
        if ( ! this.NCheckboxGroup || this.global ) {
            return;
        }

        this.NCheckboxGroup.addCheckbox(this);
    },

    beforeUnmount()
    {
        if ( this.NCheckboxGroup && ! this.global ) {
            this.NCheckboxGroup.removeCheckbox(this);
        }
    },

    methods: {

        toggle()
        {
            this.$emit('update:modelValue', this.tempChecked = ! this.tempChecked);
        },

        check()
        {
            if ( this.NCheckboxGroup ) {
                this.NCheckboxGroup.checkCheckbox(this);
            }

            this.$emit('update:modelValue', this.tempChecked = true);
        },

        uncheck()
        {
            if ( this.NCheckboxGroup ) {
                this.NCheckboxGroup.uncheckCheckbox(this);
            }

            this.$emit('update:modelValue', this.tempChecked = false);
        },

        eventShiftClick()
        {
            if ( this.NCheckboxGroup ) {
                this.NCheckboxGroup.shiftCheckbox(this);
            }

            this.$emit('update:modelValue', this.tempChecked = true);
        },

        eventLocalClick(event)
        {
            event.preventDefault();

            if ( event.shiftKey ) {
                return this.eventShiftClick();
            }
            
            if ( this.NCheckboxGroup ) {
                this.NCheckboxGroup.toggleCheckbox(this);
            }

            this.$emit('update:modelValue', this.tempChecked = ! this.tempChecked);
        },

        eventGlobalClick()
        {
            this.NCheckboxGroup.toggleAll();
        },

        updateFromGroup()
        {
            let checked = this.NCheckboxGroup.isChecked(this.value);

            if ( this.tempChecked === checked ) {
                return;
            }
            
            this.$emit('update:modelValue', this.tempChecked = checked);
        }

    },

    renderCheckbox()
    {
        let interHtml = this.$slots.intermediate &&
            this.$slots.intermediate();

        if ( ! interHtml )  {
            interHtml = (<span class={this.icons.intermediate}></span>);
        }

        let checkHtml = this.$slots.checked &&
            this.$slots.checked();

        if ( ! checkHtml )  {
            checkHtml = (<span class={this.icons.checked}></span>);
        }

        return (
            <div class="n-checkbox__checkbox">
                { this.tempIntermediate ? interHtml : checkHtml }
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
                { this.$slots.default() || this.$slots.label() }
            </div>
        );
    },

    render()
    {
        let classList = [
            'n-checkbox',
            'n-checkbox--' + this.size,
            'n-checkbox--' + this.type,
        ];

        if ( this.tempComputed ) {
            classList.push('n-checked');
        }

        if ( this.tempIntermediate ) {
            classList.push('n-intermediate');
        }

        if ( this.tempDisabled ) {
            classList.push('n-disabled');
        }

        let props = Obj.clone(this.$attrs);

        if ( ! this.tempDisabled && this.global ) {
            props.onMousedown = this.eventGlobalClick;
        }

        if ( ! this.tempDisabled && ! this.global ) {
            props.onMousedown = this.eventLocalClick;
        }

        return (
            <div class={classList} {...props}>
                { [this.ctor('renderCheckbox')(), this.ctor('renderLabel')()] }
            </div>
        );
    }

}
