import { Nano } from "nano-js";
import InfoField from "../info-field";

let { Any } = Nano;

export default {

    name: 'NInfoFieldDatetime',

    extends: InfoField,

    render()
    {
        let className = [
            'n-info__field', 'n-info__field--' + this.column.type
        ];

        return <div class={className}>
            <span>{ Any.convertDatetime(this.value, this.column.datetimeFormat, this.column.emptyText) }</span>
        </div>;
    }

}
