import { Any } from "@kizmann/pico-js";
import InfoField from "../info-field";

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
                <span>{ Any.convertBoolean(this.input, this.column.trueText, this.column.falseText) }</span>
            </div>
        );
    }

}
