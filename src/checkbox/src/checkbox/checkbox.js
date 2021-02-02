import { Arr, Obj, Any, UUID } from "@kizmann/pico-js";

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

        allowUncheck: {
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
            uid: UUID(), tempChecked: this.modelValue
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
            let canClick = ! this.tempDisabled || (this.allowUncheck &&
                this.tempChecked);

            if ( ! canClick ) {
                return;
            }

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
            let canClick = ! this.tempDisabled || (this.allowUncheck &&
                this.tempChecked);

            if ( ! canClick ) {
                return;
            }

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
            interHtml = (<i class={nano.Icons.intermediate}></i>);
        }

        let checkHtml = this.$slots.checked &&
            this.$slots.checked();

        if ( ! checkHtml )  {
            checkHtml = (<i class={nano.Icons.checked}></i>);
        }

        return (
            <div class="n-checkbox__checkbox">
                { this.tempIntermediate ? interHtml : checkHtml }
            </div>
        );
    },

    renderLabel()
    {
        if ( ! this.cslo('default') && ! this.cslo('label') ) {
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
        let size = this.size;

        if ( this.NCheckboxGroup ) {
            size = this.NCheckboxGroup.size;
        }

        let classList = [
            'n-checkbox',
            'n-checkbox--' + size,
            'n-checkbox--' + this.type,
        ];

        if ( this.allowUncheck ) {
            classList.push('n-uncheck');
        }

        if ( this.tempComputed ) {
            classList.push('n-checked');
        }

        if ( this.tempIntermediate ) {
            classList.push('n-intermediate');
        }

        if ( this.tempDisabled ) {
            classList.push('n-disabled');
        }

        if ( this.tempComputed && this.allowUncheck ) {
            Arr.remove(classList, 'n-disabled');
        }

        let props = Obj.clone(this.$attrs);

        if ( this.global ) {
            props.onMousedown = this.eventGlobalClick;
        }

        if ( ! this.global ) {
            props.onMousedown = this.eventLocalClick;
        }

        return (
            <div class={classList} {...props}>
                { [this.ctor('renderCheckbox')(), this.ctor('renderLabel')()] }
            </div>
        );
    }

}
