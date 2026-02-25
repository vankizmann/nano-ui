import { Str } from "@kizmann/pico-js";
import InfoField from "../info-field.jsx";

export default {

    name: 'NInfoFieldDatetime',

    extends: InfoField,

    render()
    {
        if ( this.column.cslo('default', this) ) {
            return (
                <div>{ this.column.$slots.default(this) }</div>
            );
        }

        return (
            <div>
                <span>{ Str.datetime(this.input, this.column.datetimeFormat, this.column.emptyText) }</span>
            </div>
        );
    }

}
