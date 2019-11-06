import { Arr, Any } from "nano-js";

export default {

    name: 'NCheckboxGroup',

    props: {

        value: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        alignment: {
            default()
            {
                return 'vertical';
            },
            type: [String]
        }

    },

    computed: {

        globalChecked()
        {
            let checked = this.checkboxes.filter((checkbox) => {
                return checkbox.nativeChecked === true;
            });

            return checked.length !== 0 && checked.length ===
                Object.keys(this.checkboxes).length;
        },

        globalDisabled()
        {
            return this.checkboxes.length === 0;
        },

        globalIntermediate()
        {
            let checked = this.checkboxes.filter((checkbox) => {
                return checkbox.nativeChecked === true;
            });

            return checked.length !== 0 && checked.length !==
                Object.keys(this.checkboxes).length;
        }

    },

    watch: {

        value()
        {
            this.changeValue();
        },

        update()
        {
            this.updateValue();
        }

    },

    methods: {

        updateValue()
        {
            let result = [];

            let checkboxes = Arr.sort(this.checkboxes, 'sort');

            Arr.each(checkboxes, (checkbox) => {
                if ( checkbox.nativeChecked === true )
                    result.push(checkbox.value);
            });

            this.$emit('input', result);
        },

        changeValue()
        {
            Arr.each(this.checkboxes, (checkbox) => {
                checkbox.nativeChecked = Any.isEmpty(this.value) === false &&
                    this.value.indexOf(checkbox.value) !== -1;
            });
        },

        addCheckbox(checkbox)
        {
            let index = Arr.findIndex(this.checkboxes, {
                value: checkbox.value
            });

            if ( index !== -1 ) {
                Arr.removeIndex(this.checkboxes, index);
            }

            checkbox.$on('input', () => {
                this.update++;
            });

            Arr.push(this.checkboxes, checkbox);
        },

        removeCheckbox(checkbox)
        {
            let index = Arr.findIndex(this.checkboxes, {
                value: checkbox.value
            });

            if ( index !== -1 ) {
                Arr.removeIndex(this.checkboxes, index);
            }
        },

        toggleCheckbox()
        {
            this.globalChecked === true ? this.checkNone() : this.checkAll();
        },

        checkAll()
        {
            Arr.each(this.checkboxes, (checkbox) => {
                this.$nextTick(() => checkbox.$emit('input', true));
            });
        },

        checkNone()
        {
            Arr.each(this.checkboxes, (checkbox) => {
                this.$nextTick(() => checkbox.$emit('input', false));
            });
        },

        pushIndex(_uid)
        {
            this.index = _uid;
        },

        shiftIndex(_uid)
        {
            let checkboxes = Arr.sort(this.checkboxes, 'sort');

            let start = Arr.findIndex(checkboxes, {
                _uid: this.index
            });

            let end = Arr.findIndex(checkboxes, {
                _uid: _uid
            });

            if ( start === -1 ) {
                start = 0;
            }

            checkboxes = end >= start ? checkboxes.slice(start, end) :
                checkboxes.slice(end, start);

            Arr.each(checkboxes, (checkbox) => {
                this.$nextTick(() => checkbox.$emit('input', true));
            });
        }

    },

    provide()
    {
        return {
            NCheckboxGroup: this
        };
    },

    data()
    {
        return {
            update: 0, checkboxes: [], index: -1
        }
    },

    render(h)
    {
        let className = [
            'n-checkbox-group', 'n-checkbox-group--' + this.alignment
        ];

        if ( this.globalChecked === true ) {
            className.push('n-checkbox-group--checked');
        }

        if ( this.globalDisabled === true ) {
            className.push('n-checkbox-group--disabled');
        }

        if ( this.globalIntermediate === true ) {
            className.push('n-checkbox-group--intermediate');
        }

        return (
            <div class={className}>
                {this.$slots.default}
            </div>
        );
    }

}
