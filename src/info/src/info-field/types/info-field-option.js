import { Arr, Obj, Any } from "@kizmann/pico-js";
import InfoField from "../info-field";

export default {

    name: 'NInfoFieldOption',

    extends: InfoField,

    render()
    {
        let options = typeof this.column.options === 'function' ?
            this.column.options(this.value) : this.column.options;

        options = Arr.map(Any.keys(options), (index) => {
            return { $value: options[index], $index: index };
        });

        let className = [
            'n-info__field', 'n-info__field--' + this.column.type
        ];

        return <div class={className}>
            <span>
                {
                    Arr.each(! Any.isArray(this.veValue) ? [this.veValue] : this.veValue, (value) => {

                        let option = Arr.find(options, (option) => {
                            return Any.string(Obj.get(option, this.column.optionsValue)) === Any.string(value);
                        });

                        return Obj.get(option, this.column.optionsLabel, value);

                    }).join(', ') || this.column.emptyText
                }
            </span>
        </div>;
    }

}
