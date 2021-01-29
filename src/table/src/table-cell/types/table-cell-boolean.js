import TableCell from "../table-cell";
import { Any } from "@kizmann/pico-js";

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
                <span>{ Any.convertBoolean(this.input, this.column.trueText, this.column.falseText) }</span>
            </div>
        );
    }

}
