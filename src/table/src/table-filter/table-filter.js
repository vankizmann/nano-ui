import CtorMixin from "../../../mixins/src/ctor";
import { Nano } from "nano-js";

let { Arr, Obj, Any, Locale } = Nano;

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
            let filter = Arr.find(this.NTable.filterProps, {
                property: this.column.filterProp
            }, {});

            return Obj.assign(defaults, filter);
        },

        changeFilter()
        {
            let data = Obj.each(this.$data, (value) => {
                return Any.isArray(value) ? value.join(',') : value;
            });

            this.column.filterColumn(data);
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

        return this.getFilterProps(defaults);
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
            <NButton type="link" size="small" disabled={Any.isEmpty(this.value)} vOn:click={this.resetFilter}>
                {this.trans('Reset')}
            </NButton>
        );
    },

    render()
    {
        return <div class="n-popover__frame">
            <div class="n-popover__body">
                { this.ctor('renderForm') && this.ctor('renderForm')() }
            </div>
            <div class="n-popover__footer n-text-right">
                { this.ctor('renderReset') && this.ctor('renderReset')() }
            </div>
        </div>;
    }
}
