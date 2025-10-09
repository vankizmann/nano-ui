import TableFilter from "../table-filter.jsx";

export default {

    name: 'NTableFilterDatetime',

    extends: TableFilter,

    methods: {

        getDefaultFilter()
        {
            return {
                type:       this.column.type, 
                value:      null, 
                operator:   'eq',
                property:   this.getFilterProp(), 
            };
        }

    },

    renderForm()
    {
        let options = {
            eq: this.trans('Exact date'),
            lt: this.trans('Before date'),
            gt: this.trans('After date'),
        };

        return (
            <NForm>
                <NFormItem>
                    <NDatepicker size="sm" vModel={this.filter.value} />
                </NFormItem>
                <NFormItem>
                    <NSelect size="sm" vModel={this.filter.operator} options={options} />
                </NFormItem>
            </NForm>
        );
    }

}
