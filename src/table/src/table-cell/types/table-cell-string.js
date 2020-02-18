import TableCell from "../table-cell";
import { Any } from "nano-js";

export default {

    name: 'NTableCellString',

    extends: TableCell,

    render()
    {
        let className = [
            'n-table__cell', 'n-table__cell--' + this.column.type
        ];

        return <div class={className}>
            <span>{ Any.convertString(this.input, this.column.emptyText) }</span>
        </div>;
    }

}
