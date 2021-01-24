import TableCell from "../table-cell";
import { Any } from "nano-js";

export default {

    name: 'NTableCellString',

    extends: TableCell,

    render()
    {
        if ( this.column.cslo('default', this) ) {
            return (
                <div>{ this.column.$slots.default(this) }</div>
            );
        }

        return (
            <div>
                <span>{ Any.convertString(this.input, this.column.emptyText) }</span>
            </div>
        );
    }

}
