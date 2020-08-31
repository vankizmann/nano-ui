import TableFilter from "../table-filter";
import { Dom, Any, Locale } from "nano-js";

export default {

    name: 'NTableFilterString',

    extends: TableFilter,

    methods: {

        resetFilter()
        {
            this.form.value = null;
            this.form.operator = 'li';
        }

    },

    data()
    {
        let defaults = {
            property: this.column.filterProp, type: this.column.type, value: null, operator: 'li'
        };

        return { form: this.getFilterProps(defaults) };
    },

    renderForm()
    {
        return (
            <NForm form={this.form}>
                <NFormItem>
                    <NInput size="small" vModel={this.form.value}/>
                </NFormItem>
                <NFormItem>
                    <NSelect size="small" vModel={this.form.operator}>
                        <NSelectOption value="li" label={this.trans('Includes value')} />
                        <NSelectOption value="nl" label={this.trans('Excludes value')} />
                        <NSelectOption value="eq" label={this.trans('Equal value')} />
                        <NSelectOption value="ne" label={this.trans('Except value')} />
                    </NSelect>
                </NFormItem>
            </NForm>
        );
    }

}
