import TableCell from "../table-cell";
import { Arr, Obj, Any } from "nano-js";

export default {

    name: 'NTableCellOption',

    extends: TableCell,

    render()
    {
        let options = typeof this.column.options === 'function' ?
            this.column.options(this.row) : this.column.options;

        options = Arr.map(Arr.clone(options), (value, index) => {
            return { $value: value, $index: index };
        });

        let className = [
            'n-table__cell', 'n-table__cell--' + this.column.type
        ];

        return <div class={className}>
            <span>
                {
                    Arr.each(! Any.isArray(this.value) ? [this.value] : this.value, (value) => {

                        let option = Arr.find(options, (item) => {
                            return Any.string(Obj.get(item, this.column.optionsValue)) === Any.string(value);
                        });

                        return Obj.get(option, this.column.optionsLabel, this.column.undefinedText);

                    }).join(', ') || this.column.emptyText
                }
            </span>
        </div>;
    }

}
