import TableCell from "../table-cell";
import { Nano } from "nano-js";

let { Any } = Nano;

export default {

    name: 'NTableCellString',

    extends: TableCell,

    render()
    {
        let className = [
            'n-table__cell', 'n-table__cell--' + this.column.type
        ];

        return <div class={className}>
            <span>{ Any.convertString(this.value, this.column.emptyText) }</span>
        </div>;
    }

}
