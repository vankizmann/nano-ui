import TableCell from "../table-cell.jsx";
import { Any } from "@kizmann/pico-js";

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

        let input = this.input.replace(/<[^>]*>?/gm, '');

        return (
            <div>
                <span>{ Any.convertString(input, this.column.emptyText) }</span>
            </div>
        );
    }

}
