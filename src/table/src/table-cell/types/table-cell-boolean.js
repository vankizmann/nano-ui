import TableCell from "../table-cell";
import { Any } from "nano-js";

export default {

    name: 'NTableCellBoolean',

    extends: TableCell,

    render()
    {
        return (
            <div>
                <span>{ Any.convertBoolean(this.input, this.column.trueText, this.column.falseText) }</span>
            </div>
        );
    }

}
