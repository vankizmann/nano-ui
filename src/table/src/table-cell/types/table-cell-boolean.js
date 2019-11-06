import TableCell from "../table-cell";
import { Nano } from "nano-js";

let { Any } = Nano;

export default {

    name: 'NTableCellBoolean',

    extends: TableCell,

    render()
    {
        let className = [
            'n-table__cell', 'n-table__cell--' + this.column.type
        ];

        return <div class={className}>
            <span>{ Any.convertBoolean(this.value, this.column.trueText, this.column.falseText) }</span>
        </div>;
    }

}
