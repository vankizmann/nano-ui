import { Any } from "@kizmann/pico-js";
import InfoField from "../info-field";

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
                <span>{ Any.convertDatetime(this.input, this.column.datetimeFormat, this.column.emptyText) }</span>
            </div>
        );
    }

}
