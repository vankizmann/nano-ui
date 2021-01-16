import TableFilter from "../table-filter";
import { Any } from "nano-js";

export default {

    name: 'NTableFilterBoolean',

    extends: TableFilter,

    methods: {

        getDefaultFilter()
        {
            return {
                type:       this.column.type, 
                value:      null, 
                operator:   'in',
                property:   this.getFilterProp(), 
            };
        }

    },

    renderForm()
    {
        let options = {
            1: this.trans(this.column.trueText),
            0: this.trans(this.column.falseText),
        };

        return (
            <NForm>
                <NFormItem>
                    <NSelect size="sm" vModel={this.filter.value} options={options} clearable={true} />
                </NFormItem>
            </NForm>
        );
    }

}
