import TableCell from "../table-cell";
import { Num, Any, Obj, Arr } from "@kizmann/pico-js";

export default {

    name: 'NTableCellSelect',

    extends: TableCell,

    beforeMount()
    {
        this.firstState = Obj.get(this.column.changedStates,
            this.uid);
    },

    methods: {

        toggleSelect()
        {
            let item = null;

            if ( ! this.isChecked() ) {
                item = Obj.assign({}, this.item);
            }

            this.column.$emit('update:modelValue', item);
        },

        isChecked()
        {
            if ( Any.isEmpty(this.column.modelValue) ) {
                return false;
            }

            return Obj.get(this.column.modelValue, this.NTable.uniqueProp) ===
                this.value[this.NTable.uniqueProp];
        },

        isDisabled()
        {
            if ( ! Any.isEmpty(this.column.modelValue) ) {
                return true;
            }

            if ( ! Any.isFunction(this.column.disabled) ) {
                return this.column.disabled;
            }

            return this.column.disabled(this);
        },

    },

    render()
    {
        let checked = this.isChecked();

        if ( this.firstState === null ) {
            this.setFirstState(checked);
        }

        if ( ! this.init ) {
            return null;
        }

        let classList = [
            'n-table-cell--checkbox'
        ];

        if ( this.firstState !== checked ) {
            classList.push('n-changed');
        }

        if ( checked ) {
            classList.push('n-checked');
        }

        let isDisabled = this.isDisabled();

        if ( this.column.allowUncheck ) {
            isDisabled = isDisabled && ! checked;
        }

        if ( isDisabled ) {
            classList.push('n-disabled');
        }

        let props = {};

        if ( ! isDisabled ) {
            props.onClick = this.toggleSelect;
        }

        return (
            <div class={classList} {...props}>
                <i class={nano.Icons.checked}></i>
            </div>
        );
    }

}
