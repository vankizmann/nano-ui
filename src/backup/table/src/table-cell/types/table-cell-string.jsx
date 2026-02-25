import TableCell from "../table-cell.jsx";
import { Str } from "@kizmann/pico-js";

export default {

    name: 'NTableCellString',

    extends: TableCell,

    render()
    {
        if ( ! this.init ) {
            return null;
        }

        if ( this.column.cslo('default', this) ) {
            return (
                <div>{ this.column.$slots.default(this) }</div>
            );
        }

        return (
            <div>
                <span>{ Str.string(this.input, this.column.emptyText) }</span>
            </div>
        );
    }

}
