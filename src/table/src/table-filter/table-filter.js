import {Arr, Obj, Any, Dom, Event, UUID} from "nano-js";

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

    computed: {

        tempFilter()
        {
            return this.NTable.getColumnFilter(this.column);
        },

        canReset()
        {
            return ! this.NTable.getColumnFiltered(this.column);
        },

        canApply()
        {
            return ! Any.isEmpty(this.filter.value);
        }

    },

    data()
    {
        return {
            filter: Obj.clone(this.tempFilter), visible: false
        };
    },

    beforeMount()
    {
        this.mountFilter();
    },

    mounted()
    {
        Event.bind('NTable:reset', 
            this.resetFilter, this._.uid);

        Dom.find(document).on('keydown', 
            this.onKeydown, this._.uid);
    },

    beforeUnmount()
    {
        Event.unbind('NTable:reset', 
            this._.uid);

        Dom.find(document).off('keydown', 
            null, this._.uid);
    },

    methods: {

        getFilterProp()
        {
            return this.column.filterProp || 
                this.column.prop;
        },

        getDefaultFilter()
        {
            return {
                type:       this.column.type, 
                value:      null,
                property:   this.getFilterProp(), 
            };
        },

        mountFilter()
        {
            if ( this.filter ) {
                return this.applyFilter();
            }

            this.filter = this.getDefaultFilter();

            if ( ! this.canApply ) {
                return;
            }

            Arr.add(this.NTable.tempFilter, this.filter, {
                property: this.getFilterProp()
            });
        },

        resetFilter(uid)
        {
            if ( this.NTable.uid !== uid ) {
                return;
            }

            this.filter = this.getDefaultFilter();

            Arr.add(this.NTable.tempFilter, this.filter, {
                property: this.getFilterProp()
            });
        },

        onKeydown(event)
        {
            if ( ! this.visible ) {
                return;
            }

            if ( event.which === 13 && this.canApply ) {
                this.applyFilter();
            }

            if ( event.which === 13 && ! this.canApply ) {
                this.clearFilter();
            }

            let closeAnyway = event.which === 13 &&
                this.NTable.closeFilterOnEnter;

            if ( closeAnyway || event.which === 27 ) {
                this.$refs.popover.close();
            }
        },

        applyFilter()
        {
            let filter = Obj.clone(this.filter);

            Arr.add(this.NTable.tempFilterProps, 
                this.getFilterProp());

            this.NTable.replaceFilter(filter, {
                property: this.getFilterProp()
            });
        },

        clearFilter()
        {
            let filter = this.getDefaultFilter();

            Arr.remove(this.NTable.tempFilterProps, 
                this.getFilterProp());

            this.NTable.replaceFilter(filter, {
                property: this.getFilterProp()
            });

            this.filter = filter;
        }

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
            size: 'xs',
            disabled: ! this.canApply
        };

        return (
            <NButton {...props} onClick={this.applyFilter}>
                { this.trans('Apply') }
            </NButton>
        );
    },

    renderReset()
    {
        let props = {
            type: 'danger',
            link: true,
            size: 'xs',
            disabled: this.canReset,
        };

        return (
            <NButton {...props} onClick={this.clearFilter}>
                { this.trans('Reset') }
            </NButton>
        );
    },

    renderFooter()
    {
        return (
            <div class="n-table-filter__footer">
                { this.ctor('renderReset')() }
                { this.ctor('renderApply')() }
            </div>
        )
    },

    render()
    {
        let props = {
            class: 'n-table-filter__popover',
            trigger: 'click',
            size: 'sm',
            width: 190,
        }

        return (
            <NPopover ref="popover" vModel={this.visible} {...props}>
                {
                    { default: this.ctor('renderForm'), footer: this.ctor('renderFooter') }
                }
            </NPopover>
        );
    }
}
