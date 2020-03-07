import TableFilter from "../table-filter";
import { Any, Locale } from "nano-js";

export default {

    name: 'NTableFilterDatetime',

    extends: TableFilter,

    methods: {

        resetFilter()
        {
            this.form.value = null;
            this.form.operator = 'eq';
        }

    },

    data()
    {
        let defaults = {
            property: this.column.filterProp, type: this.column.type, value: null, operator: 'eq'
        };


        return { form: this.getFilterProps(defaults) };
    },

    renderForm()
    {
        return <NForm form={this.form}>
            <NFormItem>
                <NDatepicker size="small" vModel={this.form.value} format2="YYYY-MM-DD"/>
            </NFormItem>
            <NFormItem>
                <NSelect size="small" vModel={this.form.operator}>
                    <NSelectOption value="eq" label={this.trans('Exact date')} />
                    <NSelectOption value="lt" label={this.trans('Before date')} />
                    <NSelectOption value="gt" label={this.trans('After date')} />
                </NSelect>
            </NFormItem>
        </NForm>;
    }

}
