import TableFilter from "../table-filter";
import { Arr, Obj, Any, Locale } from "nano-js";

export default {

    name: 'NTableFilterOption',

    extends: TableFilter,

    methods: {

        resetFilter()
        {
            this.form.value = [];
            this.form.operator = 'in';
        }

    },

    data()
    {
        let defaults = {
            property: this.column.filterProp, type: this.column.type, value: [], operator: 'in'
        };

        let form = this.getFilterProps(defaults);

        if ( ! Any.isArray(form.value) ) {
            form.value = Any.string(form.value).split(',');
        }

        return { form };
    },

    renderForm()
    {
        let options = Any.isFunction(this.column.options) ?
            this.column.options(null) : this.column.options;

        options = Arr.map(Any.keys(options), (index) => {
            return { $value: options[index], $index: index };
        });

        return (
            <NForm form={this.form}>
                <NFormItem>
                    <NCheckboxGroup size="small" vModel={this.form.value}>
                        {
                            Arr.each(options, (option) => {
                                return <NCheckbox size="small" value={Obj.get(option, this.column.optionsValue)}>
                                    { Obj.get(option, this.column.optionsLabel) }
                                </NCheckbox>;
                            })
                        }
                    </NCheckboxGroup>
                </NFormItem>
                <NFormItem>
                    <NSelect size="small" vModel={this.form.operator}>
                        <NSelectOption value="in" label={this.trans('Includes value')} />
                        <NSelectOption value="ni" label={this.trans('Excludes value')} />
                    </NSelect>
                </NFormItem>
            </NForm>
        );
    }

}
