import TableCell from "../table-cell";
import { Num, Any, Obj, Arr, UUID } from "@kizmann/pico-js";

export default {

    name: 'NTableCellMatrix',

    extends: TableCell,

    beforeMount()
    {
        this.firstState = Obj.get(this.column.changedStates,
            this.uid);
    },

    methods: {

        toggleMatrix()
        {
            let itemList = this.column.modelValue;

            if ( itemList === null ) {
                itemList = [];
            }

            let item = Arr.find(itemList, {
                [this.NTable.uniqueProp]: this.value[this.NTable.uniqueProp]
            });

            if ( ! item ) {
                item = Obj.assign({}, this.item, { [this.column.matrixProp]: 0 });
            }

            let currentMatrix = Num.int(item[this.column.matrixProp]);

            let matrix = Arr.toggle(Num.matrix(currentMatrix),
                Num.int(this.column.matrix));

            item[this.column.matrixProp] = Num.combine(matrix);

            Arr.replace(itemList, item, {
                [this.NTable.uniqueProp]: item[this.NTable.uniqueProp]
            });

            this.column.$emit('update:modelValue', itemList);
        },

        isChecked()
        {
            let item = Arr.find(this.column.modelValue, {
                [this.NTable.uniqueProp]: this.value[this.NTable.uniqueProp]
            });

            if ( ! item ) {
                return false;
            }

            if ( Num.int(this.column.matrix) === -1 ) {
                return true;
            }

            let matrix = Num.matrix(item[this.column.matrixProp]);

            return Arr.has(matrix, Num.int(this.column.matrix));
        },

        isDisabled()
        {
            if ( ! Any.isFunction(this.column.disabled) ) {
                return this.column.disabled;
            }

            return this.column.disabled(this);
        }

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
            'onUpdate:modelValue': this.toggleMatrix
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
