import { Any, Arr, Obj, UUID } from "nano-js";
import { h, resolveComponent } from "vue";

export default {

    name: 'NTable',

    model: {
        prop: 'items'
    },

    provide()
    {
        return {
            NTable: this
        };
    },

    props: {

        items: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        visibleColumns: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        current: {
            default()
            {
                return null;
            },
            type: [Array]
        },

        selected: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        expanded: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        sortProp: {
            default()
            {
                return 'id';
            },
            type: [String]
        },

        sortDir: {
            default()
            {
                return 'desc';
            },
            type: [String]
        },

        sortOnLabel: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        filterProps: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        closeFilterOnEnter: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        group: {
            default()
            {
                return ['default'];
            },
            type: [Array]
        },

        safezone: {
            default()
            {
                return (height) => height * 0.51;
            }
        },

        showEmpty: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        itemHeight: {
            default()
            {
                return 34;
            },
            type: [Number]
        },

        itemOffset: {
            default()
            {
                return 30;
            },
            type: [Number]
        },

        scrollTopOnChange: {
            default()
            {
                return true;
            }
        },

        headerHeight: {
            default()
            {
                return 40;
            },
            type: [Number]
        },

        uniqueProp: {
            default()
            {
                return 'id';
            },
            type: [String]
        },

        childProp: {
            default()
            {
                return 'children';
            },
            type: [String]
        },

        renderSelect: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        renderExpand: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        transformDrop: {
            default()
            {
                return (item) => item;
            }
        },

        disableMove: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        insertNode: {
            default()
            {
                return () => true;
            }
        },

        removeNode: {
            default()
            {
                return () => true;
            }
        },

        allowCurrent: {
            default()
            {
                return true;
            }
        },

        allowSelect: {
            default()
            {
                return () => true;
            }
        },

        allowDrag: {
            default()
            {
                return () => true;
            }
        },

        allowDrop: {
            default()
            {
                return () => true;
            }
        },

        keyDebounce: {
            default()
            {
                return 100;
            },
            type: [Number]
        },

        bufferItems: {
            default()
            {
                return 24;
            },
            type: [Number]
        },

        threshold: {
            default()
            {
                return 40;
            },
            type: [Number]
        },

    },

    computed: {

        checked()
        {
            return !! this.veSelected.length &&
                this.veSelected.length === this.items.length;
        },

        intermediate()
        {
            return !! this.veSelected.length && 
                this.veSelected.length !== this.items.length
        }

    },

    data()
    {
        return {
            uid: UUID(),
            veColumns: [],
            veFilterProps: this.filterProps,
            veSortProp: this.sortProp,
            veSortDir: this.sortDir,
            veVisibleColumns: this.visibleColumns,
            veIntersection: [],
            veSelected: []
        }
    },

    methods: {

        scrollTo(y = 0)
        {
            this.$refs.list.scrollTo(y);
        },

        refreshCurrent()
        {
            this.$refs.list.refreshCurrent();
        },

        addColumn(column)
        {
            Arr.add(this.veColumns, column, {
                prop: column._uid
            });
        },

        removeColumn(column)
        {
            Arr.remove(this.veColumns, {
                prop: column._uid
            });
        },

        showColumn(column)
        {
            if ( ! Any.isString(column) ) {
                column = column['prop'];
            }

            Arr.add(this.veVisibleColumns, column);

            this.$emit('update:visibleColumns', this.veVisibleColumns);
        },

        hideColumn(column)
        {
            if ( ! Any.isString(column) ) {
                column = column.prop;
            }

            Arr.remove(this.veVisibleColumns, column);

            this.$emit('update:visibleColumns', this.veVisibleColumns);
        },

        isHidden(column)
        {
            if ( ! Any.isString(column) ) {
                column = column.prop;
            }

            return ! Arr.has(this.veVisibleColumns, column);
        },

        sortByColumn(prop)
        {
            let dir = this.veSortDir;

            if ( prop === this.veSortProp && this.veSortDir === 'desc' ) {
                dir = 'asc';
            }

            if ( prop === this.veSortProp && this.veSortDir === 'asc' ) {
                dir = 'desc';
            }

            if ( this.veSortDir !== dir ) {
                this.$emit('update:sortDir', this.veSortDir = dir);
            }

            if ( this.veSortProp !== prop ) {
                this.$emit('update:sortProp', this.veSortProp = prop);
            }

            this.$emit('sort', this.veSortProp, this.veSortDir);
        },

        toggleSelected()
        {
            this.$refs.list.toggleAllItems(
                this.$refs.list.isIntermediate(true)
            );
        },

        clearFilters()
        {
            this.veFilterProps = [];

            // Emit reset to filters
            this.$emit('clearFilters');

            // Update prop
            this.$emit('update:filterProps', this.veFilterProps);

            // Emit filter to component
            this.$emit('filter', this.veFilterProps);
        },

        generateIntersection()
        {
            let columnProps = Arr.extract(this.veColumns, 'prop');
            
            this.veIntersection = Arr.intersect(columnProps, 
                this.veVisibleColumns);
        }

    },

    mounted()
    {
        this.$watch('veVisibleColumns', 
            this.generateIntersection, {deep: true});

        if ( ! this.veVisibleColumns.length ) {
            Arr.each(this.veColumns, (column) => column.detectVisibity());
        }

        // Any.delay(() => {
        //     Arr.each(this.veColumns, (column) =>
        //         column.bindAdaptWidth());
        // }, 500);
    },

    renderExpand()
    {
        if ( ! this.renderExpand ) {
            return null;
        }

        return (
            <div class="n-draglist-item__expand">
                { /* Only used in row */ }
            </div>
        )
    },

    renderSelect()
    {
        if ( ! this.renderSelect ) {
            return null;
        }

        let props = {
            modelValue: this.checked,
            intermediate: this.intermediate,
            disabled: ! this.items.length,
            onClick: () => this.$refs.draggable.selectAll()
        };

        return (
            <div class="n-draglist-item__select">
                <NCheckbox {...props}></NCheckbox>
            </div>
        );
    },

    renderBody(props)
    {
        let result = Obj.each(this.veColumns, (column) => {
            return column.ctor('renderBody')(props);
        });

        return Obj.values(result);
    },

    renderContext()
    {
        let columnHtml = (
            Obj.each(this.veColumns, (column) => {
                return (
                    <NCheckbox class="n-table__checkbox" value={column.prop}>
                        { column.label }
                    </NCheckbox>
                );
            })
        );

        return (
            <NPopover trigger="context" width={140}>
                <NCheckboxGroup vModel={this.veVisibleColumns} align="vertical">
                    { Obj.values(columnHtml) }
                </NCheckboxGroup>
            </NPopover>
        );
    },

    renderHead()
    {
        let defaultRender = [
            this.ctor('renderExpand')(),
            this.ctor('renderSelect')(), 
            this.ctor('renderContext')()
        ];

        let columnHtml = Obj.each(this.veColumns, (column) => {
            return column.ctor('renderHead')();
        });

        return (
            <div class="n-table__header">
                { defaultRender } { Obj.values(columnHtml) }
            </div>
        );
    },

    render()
    {
        let props = Obj.except(this.$props, [], {
            items: this.items, 
            selected: this.veSelected,
            renderNode: this.ctor('renderBody')
        });

        props['onUpdate:items'] = (value) => {
            this.$emit('update:items', value);
        }

        props['onUpdate:selected'] = (value) => {
            this.$emit('update:selected', this.veSelected = value);
        }
        
        let draggableHtml = (
            <div class="n-table__body">
                <NDraglist ref="draggable" {...props}>
                    { { default: () => this.ctor('renderBody')() } }
                </NDraglist>
            </div>
        );
    
        return (
            <div class="n-table" style="min-height: 500px;">
                <NScrollbar class="n-table__wrap" fixture={true}>
                    { [this.ctor('renderHead')(), draggableHtml] }
                </NScrollbar>
                { this.$slots.default && this.$slots.default()}
            </div>
        );
    },

}