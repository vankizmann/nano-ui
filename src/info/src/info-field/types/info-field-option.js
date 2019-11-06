import { Nano } from "nano-js";
import InfoField from "../info-field";

let { Arr, Obj, Any } = Nano;

export default {

    name: 'NInfoFieldOption',

    extends: InfoField,

    render()
    {
        let options = typeof this.column.options === 'function' ?
            this.column.options(this.item) : this.column.options;

        options = Arr.map(Any.keys(options), (index) => {
            return { $value: options[index], $index: index };
        });

        let className = [
            'n-info__field', 'n-info__field--' + this.column.type
        ];

        return <div class={className}>
            <span>
                {
                    Arr.each(! Any.isArray(this.value) ? [this.value] : this.value, (value) => {

                        let option = Arr.find(options, (option) => {
                            return Obj.get(option, this.column.optionsValue) === value;
                        });

                        return Obj.get(option, this.column.optionsLabel, value);

                    }).join(', ') || this.column.emptyText
                }
            </span>
        </div>;
    }

}
