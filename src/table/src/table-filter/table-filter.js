import {Arr, Obj, Any, UUID, Dom} from "nano-js";

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

        eventKeydown(event)
        {
            // if ( ! this.$refs.popover || ! this.$refs.popover.active() ) {
            //     return;
            // }

            if ( event.which === 13 ) {
                this.applyFilter();
            }

            let closeAnyway = event.which === 13 &&
                this.NTable.closeFilterOnEnter;

            if ( closeAnyway || event.which === 27 ) {
                this.$refs.popover.close();
            }
        },

        getFilterProps(defaults)
        {
            let filter = Arr.find(this.NTable.veFilterProps, {
                property: this.column.filterProp
            }, {});

            return Obj.assign(defaults, filter);
        },

        applyFilter()
        {
            if ( Any.isNull(this.form.value) ) {
                return;
            }

            let filterData = Obj.clone(this.form);

            Obj.map(filterData, (value) => {
                return Any.isArray(value) ? value.join(',') : value;
            });

            Arr.replace(this.NTable.veFilterProps, filterData, {
                property: this.column.filterProp
            });

            // Update filter event
            this.NTable.$emit('update:filterProps',
                this.NTable.veFilterProps);

            // Update applied state
            this.veApplied = true;

            // Send filter event
            this.NTable.$emit('filter',
                this.NTable.veFilterProps);
        },

        clearFilter()
        {
            this.resetFilter();

            Arr.remove(this.NTable.veFilterProps, {
                property: this.column.filterProp
            });

            // Update filter event
            this.NTable.$emit('update:filterProps',
                this.NTable.veFilterProps);

            // Update applied state
            this.veApplied = false;

            // Send filter event
            this.NTable.$emit('filter',
                this.NTable.veFilterProps);
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

        let data = {
            form: this.getFilterProps(defaults)
        };

        data.veApplied = ! Any.isEmpty(data.form.value);

        return data;
    },

    mounted()
    {
        // this.NTable.$on('clearFilters', () => {

        //     // Reset values
        //     this.resetFilter();

        //     // Update applied state
        //     this.veApplied = false;
        // });

        Dom.find(document).on('keydown', 
            this.eventKeydown, this._.uid);
    },

    beforeUnmount()
    {
        Dom.find(document).off('keydown', 
            null, this._.uid);
    },

    renderForm()
    {
        return null;
    },

    renderApply()
    {
        let props = {
            type: 'primary',
            link: true,
            size: 'small',
        };

        return (
            <NButton props={props} vOn:click={this.applyFilter}>
                { this.trans('Apply') }
            </NButton>
        );
    },

    renderReset()
    {
        let props = {
            type: 'danger',
            link: true,
            size: 'small',
            disabled: ! this.veApplied,
        };

        return (
            <NButton props={props} vOn:click={this.clearFilter}>
                { this.trans('Reset') }
            </NButton>
        );
    },

    render()
    {
        return (
            <NPopover ref="popover" trigger="click" size="sm">
                {
                    {
                        default: [
                            this.ctor('renderForm')()
                        ]
                    }
                }
            </NPopover>
        );
    }
}
