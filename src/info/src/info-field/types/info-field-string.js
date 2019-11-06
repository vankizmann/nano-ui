import { Nano } from "nano-js";
import InfoField from "../info-field";

let { Any } = Nano;

export default {

    name: 'NInfoFieldString',

    extends: InfoField,

    render()
    {
        let className = [
            'n-info__field', 'n-info__field--' + this.column.type
        ];

        return <div class={className}>
            <span>{ Any.convertString(this.value, this.column.emptyText) }</span>
        </div>;
    }

}
