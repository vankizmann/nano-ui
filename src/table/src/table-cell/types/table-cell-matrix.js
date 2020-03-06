import TableCell from "../table-cell";
import { Any } from "nano-js";

export default {

    name: 'NTableCellMatrix',

    extends: TableCell,

    render()
    {
        let className = [
            'n-table-cell',
            'n-table-cell--' + this.column.type
        ];

        return <div class={className}>
            <NCheckbox />
        </div>;
    }

}
