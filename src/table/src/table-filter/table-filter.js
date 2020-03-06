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

        getFilterProps(defaults)
        {
            let filter = Arr.find(this.NTable.veFilterProps, {
                property: this.column.filterProp
            }, {});

            return Obj.assign(defaults, filter);
        },

        changeFilter()
        {
            let newData = Obj.map(Obj.clone(this.form), (value) => {
                return ! Any.isEmpty(value) && Any.isArray(value) ?
                    value.join(',') : value;
            });

            if ( Any.md5(this.newData) === Any.md5(newData) ) {
                return;
            }

            this.newData = newData;

            let filterProps = Arr.clone(this.NTable.veFilterProps);

            Arr.replace(filterProps, newData, {
                property: this.column.filterProp
            });

            filterProps = Arr.filter(filterProps, (prop) => {
                return ! Any.isEmpty(prop.value);
            });

            this.NTable.veFilterProps = filterProps;

            // Update filter event
            this.NTable.$emit('update:filterProps', this.NTable.veFilterProps);

            // Send filter event
            this.NTable.$emit('filter', this.NTable.veFilterProps);
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

        return { form: this.getFilterProps(defaults) };
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
