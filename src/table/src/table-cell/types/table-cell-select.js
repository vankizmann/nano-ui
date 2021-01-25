import TableCell from "../table-cell";
import { Num, Any, Obj, Arr } from "nano-js";

export default {

    name: 'NTableCellSelect',

    extends: TableCell,

    beforeMount()
    {
        this.firstState = Obj.get(this.column.changedStates,
            this.uid);
    },

    methods: {

        toggleSelect(value)
        {
            let item = null;

            if ( value ) {
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
        let modelValue = this.isChecked();

        if ( this.firstState === null ) {
            Obj.set(this.column.changedStates,
                this.uid, this.firstState = modelValue);
        }

        let classList = [];

        if ( this.firstState !== modelValue ) {
            classList.push('n-changed');
        }

        let props = {
            modelValue: modelValue,
            disabled: this.isDisabled(),
            allowUncheck: this.column.allowUncheck,
            'onUpdate:modelValue': this.toggleSelect
        };

        return (
            <div class={classList}>
                <NCheckbox {...props}>
                    { this.column.cslo('default', this) && this.column.$slots.default(this) }
                </NCheckbox>
            </div>
        );
    }

}
