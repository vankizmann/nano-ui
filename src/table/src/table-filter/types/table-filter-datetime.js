import TableFilter from "../table-filter";
import { Any, Locale } from "nano-js";

export default {

    name: 'NTableFilterDatetime',

    extends: TableFilter,

    methods: {

        resetFilter()
        {
            this.value = null;
            this.operator = 'eq';
        }

    },

    data()
    {
        let defaults = {
            property: this.column.filterProp, type: this.column.type, value: null, operator: 'eq'
        };

        let options = this.getFilterProps(defaults);

        if ( Any.isEmpty(options.value) ) {
            options.value = 'now'
        }

        return options;
    },

    renderForm()
    {
        return <NForm vModel={this.$data} vOn:change={Any.debounce(this.changeFilter)}>
            <NFormItem>
                <NDatepicker size="small" vModel={this.value} format="YYYY-MM-DD"/>
            </NFormItem>
            <NFormItem>
                <NSelect size="small" vModel={this.operator}>
                    <NSelectOption value="eq" label={this.trans('Exact date')} />
                    <NSelectOption value="lt" label={this.trans('Before date')} />
                    <NSelectOption value="gt" label={this.trans('After date')} />
                </NSelect>
            </NFormItem>
        </NForm>;
    }

}
