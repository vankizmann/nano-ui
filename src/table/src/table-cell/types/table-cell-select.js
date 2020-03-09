import TableCell from "../table-cell";
import { Num, Any, Obj, Arr } from "nano-js";

export default {

    name: 'NTableCellSelect',

    extends: TableCell,

    methods: {

        toggleSelect()
        {
            let item = Arr.find(this.column.veValue, {
                [this.NTable.uniqueProp]: this.value[this.NTable.uniqueProp]
            });

            if ( ! item ) {
                item = Obj.assign({}, this.value, { [this.column.prop]: 0 });
            }

            let matrix = Arr.toggle(
                Num.matrix(Num.int(item[this.column.prop])), Num.int(this.column.matrix)
            );

            item[this.column.prop] = Num.combine(matrix);

            Arr.replace(this.column.veValue, item, {
                [this.NTable.uniqueProp]: item[this.NTable.uniqueProp]
            });

            this.column.$emit('input', this.column.veValue);
        },

        isSelected()
        {
            let item = Arr.find(this.column.veValue, {
                [this.NTable.uniqueProp]: this.value[this.NTable.uniqueProp]
            });

            if ( ! item ) {
                return false;
            }

            let matrix = Num.matrix(item[this.column.prop]);

            if ( Num.int(this.column.matrix) === -1 ) {
                return true;
            }

            return Arr.has(matrix, Num.int(this.column.matrix));
        },

    },

    render()
    {
        let classList = [
            'n-table-cell',
            'n-table-cell--' + this.column.type
        ];

        let disabled = Any.isFunction(this.column.disabled) ?
            this.column.disabled(this.value) : this.column.disabled;

        return (
            <div class={classList}>
                <NCheckbox checked={this.isSelected()} disabled={disabled} vOn:input={this.toggleSelect} />
            </div>
        );
    }

}