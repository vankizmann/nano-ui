import { Any } from "@kizmann/pico-js";
import InfoField from "../info-field";

export default {

    name: 'NInfoFieldBoolean',

    extends: InfoField,

    render()
    {
        let className = [
            'n-info__field', 'n-info__field--' + this.column.type
        ];

        return <div class={className}>
            <span>{ Any.convertBoolean(this.input, this.column.trueText, this.column.falseText) }</span>
        </div>;
    }

}
