import TableFilter from "../table-filter";
import { Arr, Obj, Any, Locale } from "nano-js";

export default {

    name: 'NTableFilterOption',

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

        let options = this.getFilterProps(defaults);

        if ( ! Any.isArray(options) ) {
            options.value = Any.string(options.value).split(',');
        }

        // if ( ! Any.isArray(options) ) {
        //     options.value = [options.value];
        // }

        return options;
    },

    renderForm()
    {
        let options = typeof this.column.options === 'function' ?
            this.column.options(null) : this.column.options;

        options = Arr.map(Any.keys(options), (index) => {
            return { $value: options[index], $index: index };
        });

        return <NForm vModel={this.$data} vOn:change={Any.debounce(this.changeFilter)}>
            <NFormItem>
                <NCheckboxGroup size="small" vModel={this.value}>
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
                <NSelect size="small" vModel={this.operator}>
                    <NSelectOption value="in" label={this.trans('Includes value')} />
                    <NSelectOption value="ni" label={this.trans('Excludes value')} />
                </NSelect>
            </NFormItem>
        </NForm>;
    }

}
