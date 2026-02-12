import TableCell from "../table-cell.jsx";
import { Str } from "@kizmann/pico-js";

export default {

    name: 'NTableCellBoolean',

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
                <span>{ Str.boolean(this.input, this.column.trueText, this.column.falseText) }</span>
            </div>
        );
    }

}
