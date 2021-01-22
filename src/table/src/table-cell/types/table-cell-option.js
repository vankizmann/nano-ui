import TableCell from "../table-cell";
import { Arr, Obj, Any } from "nano-js";

export default {

    name: 'NTableCellOption',

    extends: TableCell,

    render()
    {
        if ( this.column.$slots.default ) {
            return (
                <div>{ this.column.$slots.default(this) }</div> 
            );
        }
        
        let options = Any.isFunction(this.column.options) ?
            this.column.options(this.value) : this.column.options;

        options = Arr.map(Arr.clone(options), (value, index) => {
            return { $value: value, $index: index };
        });

        let className = [
            'n-table-cell',
            'n-table-cell--' + this.column.type
        ];

        return <div class={className}>
            <span>
                {
                    Arr.each(! Any.isObject(this.input) ? [this.input] : this.input, (value) => {

                        let option = Arr.find(options, (item) => {
                            return Obj.get(item, this.column.optionsValue) == value;
                        });

                        return Obj.get(option, this.column.optionsLabel, this.column.undefinedText);

                    }).join(', ') || this.column.emptyText
                }
            </span>
        </div>;
    }

}
