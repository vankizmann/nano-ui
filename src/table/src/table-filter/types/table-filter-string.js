import TableFilter from "../table-filter";
import { Any, Locale } from "nano-js";

export default {

    name: 'NTableFilterString',

    extends: TableFilter,

    methods: {

        resetFilter()
        {
            this.value = null;
            this.operator = 'li';
        }

    },

    data()
    {
        let defaults = {
            property: this.column.filterProp, type: this.column.type, value: null, operator: 'li'
        };

        return this.getFilterProps(defaults);
    },

    renderForm()
    {
        return (
            <NForm form={this.$data} vOn:change={Any.debounce(this.changeFilter)}>
                <NFormItem>
                    <NInput size="small" vModel={this.value}/>
                </NFormItem>
                <NFormItem>
                    <NSelect size="small" vModel={this.operator}>
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
