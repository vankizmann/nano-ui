import { Str } from "@kizmann/pico-js";
import InfoField from "../info-field.jsx";

export default {

    name: 'NInfoFieldBoolean',

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
                <span>{ Str.boolean(this.input, this.column.trueText, this.column.falseText) }</span>
            </div>
        );
    }

}
