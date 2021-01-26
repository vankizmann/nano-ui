import TableFilter from "../table-filter";
import { Dom, Any, Locale } from "@kizmann/pico-js";

export default {

    name: 'NTableFilterString',

    extends: TableFilter,

    methods: {

        getDefaultFilter()
        {
            return {
                type:       this.column.type, 
                value:      null, 
                operator:   'li',
                property:   this.getFilterProp(), 
            };
        }

    },

    renderForm()
    {
        let options = {
            li: this.trans('Includes value'),
            nl: this.trans('Excludes value'),
            eq: this.trans('Equal value'),
            ne: this.trans('Except value'),
        };

        return (
            <NForm>
                <NFormItem>
                    <NInput size="sm" vModel={this.filter.value} />
                </NFormItem>
                <NFormItem>
                    <NSelect size="sm" vModel={this.filter.operator} options={options} />
                </NFormItem>
            </NForm>
        );
    }

}
