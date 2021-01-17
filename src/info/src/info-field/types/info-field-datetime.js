import { Any } from "nano-js";
import InfoField from "../info-field";

export default {

    name: 'NInfoFieldDatetime',

    extends: InfoField,

    render()
    {
        let className = [
            'n-info__field', 'n-info__field--' + this.column.type
        ];

        return <div class={className}>
            <span>{ Any.convertDatetime(this.input, this.column.datetimeFormat, this.column.emptyText) }</span>
        </div>;
    }

}
