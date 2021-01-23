import TableCell from "../table-cell";
import { Any } from "nano-js";

export default {

    name: 'NTableCellDatetime',

    extends: TableCell,

    render()
    {
        if ( this.column.cslo('default') ) {
            return (
                <div>{ this.column.$slots.default(this) }</div> 
            );
        }

        return (
            <div>
                <span>{ Any.convertDatetime(this.input, this.column.datetimeFormat, this.column.emptyText) }</span>
            </div>
        );
    }

}
