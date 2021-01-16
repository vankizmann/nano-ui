import TableCell from "../table-cell";
import { Any } from "nano-js";

export default {

    name: 'NTableCellString',

    extends: TableCell,

    render()
    {
        return (
            <div>
                <span>{ Any.convertString(this.input, this.column.emptyText) }</span>
            </div>
        );
    }

}
