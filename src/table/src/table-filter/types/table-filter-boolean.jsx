import TableFilter from "../table-filter.jsx";
import { Any } from "@kizmann/pico-js";

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
                    <NSelect size="sm" vModel={this.filter.value} options={options} />
                </NFormItem>
            </NForm>
        );
    }

}
