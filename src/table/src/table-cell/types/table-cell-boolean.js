import TableCell from "../table-cell";
import { Any } from "nano-js";

export default {

    name: 'NTableCellBoolean',

    extends: TableCell,

    render()
    {
        let className = [
            'n-table-cell', 'n-table-cell--' + this.column.type
        ];

        return <div class={className}>
            <span>{ Any.convertBoolean(this.input, this.column.trueText, this.column.falseText) }</span>
        </div>;
    }

}
