import TableFilter from "../table-filter";
import { Arr, Obj, Any, Locale } from "@kizmann/pico-js";

export default {

    name: 'NTableFilterOption',

    extends: TableFilter,

    methods: {

        getDefaultFilter()
        {
            return {
                type:       this.column.type,
                value:      [],
                operator:   'in',
                property:   this.getFilterProp(),
            };
        }

    },

    renderOption(value)
    {
        let props = {
            value: Obj.get(value, this.column.optionsValue)
        };

        return (
            <NCheckbox {...props}>{ Obj.get(value, this.column.optionsLabel) }</NCheckbox>
        );
    },

    renderForm()
    {
        let items = this.column.options;

        if ( Any.isFunction(items) ) {
            items = this.column.options(this);
        }

        items = Arr.each(items, (value, index) => {
            return { $value: value, $index: index };
        });

        let options = {
            in: this.trans('Includes value'),
            ni: this.trans('Excludes value'),
        };

        return (
            <NForm>
                <NFormItem>
                    <NCheckboxGroup size="sm" align="vertical" vModel={this.filter.value}>
                        { Arr.each(items, this.ctor('renderOption')) }
                    </NCheckboxGroup>
                </NFormItem>
                <NFormItem>
                    <NSelect size="sm" vModel={this.filter.operator} options={options} />
                </NFormItem>
            </NForm>
        );
    }

}
