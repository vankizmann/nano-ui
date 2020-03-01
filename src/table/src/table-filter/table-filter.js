import CtorMixin from "../../../mixins/src/ctor";
import { Arr, Obj, Any, UUID } from "nano-js";

export default {

    inject: {

        NTable: {
            default: undefined
        }

    },

    props: {

        column: {
            required: true
        }

    },

    methods: {

        ...CtorMixin,

        getFilterProps(defaults)
        {
            let filter = Arr.find(this.NTable.veFilterProps, {
                property: this.column.filterProp
            }, {});

            return Obj.assign(defaults, filter);
        },

        changeFilter()
        {
            let newData = Obj.each(this.form, (value) => {
                return Any.isArray(value) ? value.join(',') : value;
            });

            Arr.remove(this.NTable.veFilterProps, {
                property: this.column.filterProp
            });

            Arr.push(this.NTable.veFilterProps, newData);
        },

        resetFilter()
        {
            // Reset data
        }

    },

    data()
    {
        let defaults = {
            property: this.column.filterProp, type: this.column.type, value: null
        };

        return {
            form: this.getFilterProps(defaults)
        };
    },

    mounted()
    {
        this.NTable.$on('reset', this.resetFilter);
    },

    renderForm()
    {
        return null;
    },

    renderReset()
    {
        return (
            <NButton key={UUID()} type="link" size="small" disabled={Any.isEmpty(this.form.value)} vOn:click={this.resetFilter}>
                {this.trans('Reset')}
            </NButton>
        );
    },

    render()
    {
        return (
            <div class="n-popover__frame">
                <div class="n-popover__body">
                    { this.ctor('renderForm') && this.ctor('renderForm')() }
                </div>
                <div class="n-popover__footer n-text-right">
                    { this.ctor('renderReset') && this.ctor('renderReset')() }
                </div>
            </div>
        );
    }
}
