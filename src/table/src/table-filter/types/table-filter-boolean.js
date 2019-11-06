import TableFilter from "../table-filter";
import { Nano } from "nano-js";

let { Any } = Nano;

export default {

    name: 'NTableFilterBoolean',

    extends: TableFilter,

    methods: {

        resetFilter()
        {
            this.value = null;
            this.operator = 'in';
        }

    },

    data()
    {
        let defaults = {
            property: this.column.filterProp, type: this.column.type, value: null, operator: 'in'
        };

        return this.getFilterProps(defaults);
    },

    renderForm()
    {
        return <NForm vModel={this.$data} vOn:change={Any.debounce(this.changeFilter)}>
            <NFormItem>
                <NSelect size="small" vModel={this.value}>
                    <NSelectOption value="1" label={this.column.trueText} />
                    <NSelectOption value="0" label={this.column.falseText} />
                </NSelect>
            </NFormItem>
        </NForm>;
    }

}
