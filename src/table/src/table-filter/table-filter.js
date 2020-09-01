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
            if ( ! this.$refs.popover || ! this.$refs.popover.active() ) {
                return;
            }

            if ( event.which === 13 ) {
                this.applyFilter();
            }

            if ( event.which === 27 ) {
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
        this.NTable.$on('reset', this.resetFilter);

        let ident = {
            _uid: this._uid
        };

        Dom.find(document).on('keydown', this.eventKeydown, ident);
    },

    beforeDestroy()
    {
        console.log(this);

        let ident = {
            _uid: this._uid
        };

        Dom.find(document).off('keydown', ident);
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
        // Disabled maybe use this at some point
        if ( ! this.boundaryEl && false ) {
            this.boundaryEl = Dom.find(this.NTable.$el)
                .find('.n-table__inner').get(0);
        }

        return (
            <NPopover ref="popover" type="filter" trigger="click" boundary={this.boundaryEl}>
                <template slot="default">
                    { this.ctor('renderForm')() }
                </template>
                <template slot="footer">
                    { this.ctor('renderReset')() }
                    { this.ctor('renderApply')() }
                </template>
            </NPopover>
        );
    }
}
