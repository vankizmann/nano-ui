import TableFilter from "../table-filter";
import { Any } from "nano-js";

export default {

    name: 'NTableFilterBoolean',

    extends: TableFilter,

    methods: {

        resetFilter()
        {
            this.form.value = null;
            this.form.operator = 'in';
        }

    },

    data()
    {
        let defaults = {
            property: this.column.filterProp, type: this.column.type, value: null, operator: 'in'
        };

        return { form: this.getFilterProps(defaults) };
    },

    renderForm()
    {
        return (
            <NForm form={this.form} vOn:change={this.changeFilter}>
                <NFormItem>
                    <NSelect size="small" vModel={this.form.value}>
                        <NSelectOption value="1" label={this.column.trueText} />
                        <NSelectOption value="0" label={this.column.falseText} />
                    </NSelect>
                </NFormItem>
            </NForm>
        );
    }

}
