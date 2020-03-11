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

        value: {
            default()
            {
                return [];
            },
            type: [Array]
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
            let checked = Arr.filter(this.veCheckboxes, (checkbox) => {
                return checkbox.veChecked;
            });

            return this.veCheckboxes.length !== 0 &&
                checked.length === this.veCheckboxes.length;
        },

        globalIntermediate()
        {
            let checked = this.veCheckboxes.filter((checkbox) => {
                return checkbox.veChecked;
            });

            return checked.length !== 0 &&
                checked.length !== this.veCheckboxes.length;
        },

        globalDisabled()
        {
            return this.veCheckboxes.length === 0;
        },

    },

    data()
    {
        return {
            veValue: this.value,
            veCheckboxes: [],
            veIndex: -1
        }
    },

    watch: {

        value()
        {
            if ( this.value !== this.veValue ) {
                this.veValue = this.value;
            }
        },

    },

    methods: {

        addCheckbox(checkbox)
        {
            this.veIndex = -1;

            Arr.add(this.veCheckboxes, checkbox, {
                _uid: checkbox._uid
            });

            this.veCheckboxes = Arr.sort(this.veCheckboxes, 'sort');
        },

        removeCheckbox(checkbox)
        {
            Arr.remove(this.veCheckboxes, {
                _uid: checkbox._uid
            });

            this.veIndex = -1;
        },

        toggleCheckbox(checkbox)
        {
            let veIndex = Arr.findIndex(this.veCheckboxes, {
                _uid: checkbox._uid
            });

            if ( ! checkbox.veChecked ) {
                this.veIndex = veIndex;
            }

            Arr.toggle(this.veValue, checkbox.value);
        },

        checkCheckbox(checkbox)
        {
            Arr.add(this.veValue, checkbox.value);
        },

        uncheckCheckbox(checkbox)
        {
            Arr.remove(this.veValue, checkbox.value);
        },

        shiftCheckbox(checkbox)
        {
            if ( this.veIndex === -1 ) {
                return this.toggleCheckbox(checkbox);
            }

            let veIndex = Arr.findIndex(this.veCheckboxes, {
                _uid: checkbox._uid
            });

            let checkboxes = this.veCheckboxes.slice(this.veIndex, veIndex + 1);

            if ( veIndex < this.veIndex ) {
                checkboxes = this.veCheckboxes.slice(veIndex, this.veIndex + 1);
            }

            Arr.each(checkboxes, (checkbox) => checkbox.check());

            this.veIndex = -1;
        },

        toggleAll()
        {
            this.globalChecked ? this.uncheckAll() : this.checkAll();
        },

        checkAll()
        {
            Arr.each(this.veCheckboxes, (checkbox) => checkbox.check());
        },

        uncheckAll()
        {
            Arr.each(this.veCheckboxes, (checkbox) => checkbox.uncheck());
        },

        isChecked(value)
        {
            return Arr.has(this.veValue, value);
        }

    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-checkbox-group',
            'n-checkbox-group--' + this.align
        ];

        return (
            <div class={classList}>
                {this.$slots.default}
            </div>
        );
    }

}
