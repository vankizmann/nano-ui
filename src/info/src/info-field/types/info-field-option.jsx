import { Arr, Obj, Any } from "@kizmann/pico-js";
import InfoField from "../info-field.jsx";

export default {

    name: 'NInfoFieldOption',

    extends: InfoField,

    renderOption(value)
    {
        let options = this.column.options;

        if ( Any.isFunction(options) ) {
            options = this.column.options(this);
        }

        let prop = this.column.optionsValue;

        options = Arr.each(options, (value, index) => {
            return { $value: value, $index: index };
        });

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
