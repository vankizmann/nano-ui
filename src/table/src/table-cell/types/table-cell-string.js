import TableCell from "../table-cell";
import { Any } from "nano-js";

export default {

    name: 'NTableCellString',

    extends: TableCell,

    render()
    {
        let className = [
            'n-table-cell',
            'n-table-cell--' + this.column.type
        ];

        return (
            <div class={className}>
                <span>{ Any.convertString(this.input, this.column.emptyText) }</span>
            </div>
        );
    }

}
