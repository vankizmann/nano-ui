import { Arr, Any } from "nano-js";

export default {

    name: 'NCheckboxGroup',

    provide()
    {
        return {
            NCheckboxGroup: this
        };
    },

    props: {

        modelValue: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

        align: {
            default()
            {
                return 'horizontal';
            },
            type: [String]
        }

    },

    computed: {

        globalChecked()
        {
            let checked = Arr.filter(this.elements, (checkbox) => {
                return checkbox.tempChecked;
            });

            return checked.length === this.elements.length &&
                this.elements.length !== 0;
        },

        globalIntermediate()
        {
            let checked = this.elements.filter((checkbox) => {
                return checkbox.tempChecked;
            });

            return checked.length !== this.elements.length &&
                checked.length !== 0 ;
        },

        globalDisabled()
        {
            return this.elements.length === 0;
        },

    },

    data()
    {
        return {
            tempValue: this.modelValue,
            index: -1,
            elements: []
        }
    },

    watch: {

        value()
        {
            if ( this.tempValue = this.modelValue ) {
                this.tempValue = this.modelValue;
            }
            
        },

    },

    methods: {

        addCheckbox(checkbox)
        {
            this.index = -1;

            Arr.add(this.elements, checkbox, {
                uid: checkbox.uid
            });

            this.elements = Arr.sort(this.elements, 'sort');
        },

        removeCheckbox(checkbox)
        {
            Arr.remove(this.elements, {
                uid: checkbox.uid
            });

            this.index = -1;
        },

        toggleCheckbox(checkbox, emit = true)
        {
            let index = Arr.findIndex(this.elements, {
                uid: checkbox.uid
            });

            if ( ! checkbox.tempChecked ) {
                this.index = index;
            }

            Arr.toggle(this.tempValue, checkbox.value);

            if ( ! emit ) {
                return;
            }

            this.$emit('update:modelValue', this.tempValue);
        },

        checkCheckbox(checkbox, emit = true)
        {
            Arr.add(this.tempValue, checkbox.value);

            if ( ! emit ) {
                return;
            }

            this.$emit('update:modelValue', this.tempValue);
        },

        uncheckCheckbox(checkbox, emit = true)
        {
            Arr.remove(this.tempValue, checkbox.value);

            if ( ! emit ) {
                return;
            }

            this.$emit('update:modelValue', this.tempValue);
        },

        shiftCheckbox(checkbox)
        {
            if ( this.index === -1 ) {
                return this.toggleCheckbox(checkbox, false);
            }

            let index = Arr.findIndex(this.elements, {
                uid: checkbox.uid
            });

            let checkboxes = this.elements.slice(this.index, index + 1);

            if ( index < this.index ) {
                checkboxes = this.elements.slice(index, this.index + 1);
            }

            this.index = -1;

            Arr.each(checkboxes, (checkbox) => {
                this.checkCheckbox(checkbox, false);
            });

            Arr.each(checkboxes, (checkbox) => {
                checkbox.updateFromGroup();
            });

            this.$emit('update:modelValue', this.tempValue);
        },

        toggleAll()
        {
            this.globalChecked ? this.uncheckAll() : this.checkAll();
        },

        checkAll()
        {
            Arr.each(this.elements, (checkbox) => {
                this.checkCheckbox(checkbox, false);
            });

            Arr.each(this.elements, (checkbox) => {
                checkbox.updateFromGroup();
            });

            this.$emit('update:modelValue', this.tempValue);
        },

        uncheckAll()
        {
            Arr.each(this.elements, (checkbox) => {
                this.uncheckCheckbox(checkbox, false);
            });

            Arr.each(this.elements, (checkbox) => {
                checkbox.updateFromGroup();
            });

            this.$emit('update:modelValue', this.tempValue);
        },

        isChecked(value)
        {
            return Arr.has(this.tempValue, value);
        }

    },

    render()
    {
        let classList = [
            'n-checkbox-group',
            'n-checkbox-group--' + this.size,
            'n-checkbox-group--' + this.align,
        ];

        return (
            <div class={classList}>
                {this.$slots.default()}
            </div>
        );
    }

}
