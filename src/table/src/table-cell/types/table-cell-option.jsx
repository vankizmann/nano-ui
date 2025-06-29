import TableCell from "../table-cell.jsx";
import { Arr, Obj, Any } from "@kizmann/pico-js";

export default {

    name: 'NTableCellOption',

    extends: TableCell,

    renderOption(value)
    {
        let options = this.column.options;

        if ( Any.isFunction(options) ) {
            options = this.column.options(this);
        }

        options = Arr.each(options, (value, index) => {
            return { $value: value, $index: index };
        });

        let prop = this.column.optionsValue;

        let option = Arr.find(options, (item) => {
            return Obj.get(item, prop) == value;
        });

        if ( ! option ) {
            return [this.column.emptyText];
        }

        return Obj.get(option, this.column.optionsLabel,
            this.column.undefinedText);
    },

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

        let input = ! Any.isObject(this.input) ?
            [this.input] : this.input;

        return (
            <div>
                <span>{ Arr.each(input, this.ctor('renderOption')) }</span>
            </div>
        );
    }

}
