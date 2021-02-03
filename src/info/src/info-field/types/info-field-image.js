import InfoField from "../info-field";
import { Any } from "@kizmann/pico-js";

export default {

    name: 'NInfoFieldImage',

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
                <div style={'background-image: url(\'' + this.input + '\');'} />
            </div>
        );
    }

}
