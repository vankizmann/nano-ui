import { Any } from "@kizmann/pico-js";
import InfoField from "../info-field.jsx";

export default {

    name: 'NInfoFieldString',

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
                <span>{ Any.convertString(this.input, this.column.emptyText) }</span>
            </div>
        );
    }

}
