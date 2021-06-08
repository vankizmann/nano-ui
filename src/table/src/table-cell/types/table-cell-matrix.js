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
            if ( this.column.matrix === -1 ) {
                return this.toggleSelect();
            }

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

        toggleSelect()
        {
            let itemList = this.column.modelValue;

            if ( itemList === null ) {
                itemList = [];
            }

            let fallback = Obj.assign({}, this.item, {
                [this.column.matrixProp]: this.column.matrix
            });

            let finder = {
                [this.NTable.uniqueProp]: this.value[this.NTable.uniqueProp],
            };

            let item = Arr.find(itemList, finder);

            if ( ! item ) {
                Arr.add(itemList, fallback);
            } else {
                Arr.remove(itemList, finder);
            }

            this.column.$emit('update:modelValue', itemList);
        },

        isChecked()
        {
            let matrix = Obj.get(this.column.matrixValues,
                this.item[this.NTable.uniqueProp]);

            if ( ! matrix ) {
                return false;
            }

            let value = Num.int(this.column.matrix);

            if ( value === -1 ) {
                return true;
            }

            return Arr.has(matrix, value);
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
            props.onClick = this.toggleMatrix;
        }

        return (
            <div class={classList} {...props}>
                <i class={nano.Icons.checked}></i>
            </div>
        );
    }

}
