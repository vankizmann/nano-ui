import { Any, Arr, Obj, UUID } from "nano-js";

export default {

    name: 'NTable',

    model: {
        prop: 'items'
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

        safeZone: {
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

        viewportHeight: {
            default()
            {
                return false;
            }
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

        keyProp: {
            default()
            {
                return 'md5';
            },
            type: [String]
        },

        orderProp: {
            default()
            {
                return 'order';
            },
            type: [String]
        },

        uniqueProp: {
            default()
            {
                return 'id';
            },
            type: [String]
        },

        depthProp: {
            default()
            {
                return 'depth';
            },
            type: [String]
        },

        pathProp: {
            default()
            {
                return 'path';
            },
            type: [String]
        },

        indexProp: {
            default()
            {
                return 'index';
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

        ghostMode: {
            default()
            {
                return true;
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

        wrapNode: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        updateDelay: {
            default()
            {
                return 80;
            },
            type: [Number]
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
                return 10;
            },
            type: [Number]
        },

        threshold: {
            default()
            {
                return 100;
            },
            type: [Number]
        },

        loadingInit: {
            default()
            {
                return 450;
            }
        },

        loadingDelay: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        loadingMax: {
            default()
            {
                return 1250;
            },
            type: [Number]
        },

        loadingMin: {
            default()
            {
                return 450;
            },
            type: [Number]
        },

    },

    provide()
    {
        return { NTable: this };
    },

    data()
    {
        return {
            veColumns: [],
            veFilterProps: this.filterProps,
            veSortProp: this.sortProp,
            veSortDir: this.sortDir,
            veVisibleColumns: this.visibleColumns,
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
                column = column['prop'];
            }

            Arr.remove(this.veVisibleColumns, column);

            this.$emit('update:visibleColumns', this.veVisibleColumns);
        },

        columnHidden(column)
        {
            if ( ! Any.isString(column) ) {
                column = column['prop'];
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
        }

    },

    mounted()
    {
        if ( ! this.veVisibleColumns.length ) {
            Arr.each(this.veColumns, (column) =>
                column.detectVisibity());
        }

        Any.delay(() => {
            Arr.each(this.veColumns, (column) =>
                column.bindAdaptWidth());
        }, 500);
    },

    renderExpand()
    {
        if ( ! this.renderExpand ) {
            return null;
        }

        return (
            <div class="n-draggable-item__expand">
                { /* Only used in row */ }
            </div>
        )
    },

    renderSelect()
    {
        if ( ! this.renderSelect ) {
            return null;
        }

        let events = {
            input: this.toggleSelected
        };

        let props = {
            disabled: ! this.items.length
        };

        if ( this.$refs.list && this.items.length ) {
            props['checked'] = this.$refs.list.isAllSelected(true);
            props['intermediate'] = this.$refs.list.isIntermediate(true);
        }

        return (
            <div class="n-draggable-item__select">
                <NCheckbox props={props} on={events} />
            </div>
        );
    },

    renderBody(props)
    {
        return Arr.each(this.veColumns, (column) => {
            return column.ctor('renderBody')(props);
        });
    },

    renderHeadPopover()
    {
        let columnHtml = (
            Arr.each(this.veColumns, (column) => {
                return (
                    <NCheckbox size="small" value={column.prop}>
                        { column.label }
                    </NCheckbox>
                );
            })
        );

        return (
            <NPopover trigger="context" close-inside={false}>
                <NCheckboxGroup vModel={this.veVisibleColumns} align="vertical">
                    { columnHtml }
                </NCheckboxGroup>
            </NPopover>
        );
    },

    renderHead()
    {
        let defaultRender = [
            this.ctor('renderExpand')(),
            this.ctor('renderSelect')()
        ];

        let columnHtml = Arr.each(this.veColumns, (column) => {
            return column.ctor('renderHead')();
        });

        let headHtml = (
            <div class="n-table__head">
                {[defaultRender, ...columnHtml]}
            </div>
        );

        return [headHtml, this.ctor('renderHeadPopover')()];
    },

    render($render)
    {
        this.$render = $render;

        let props = Obj.assign({}, this.$props, {
            renderNode: this.ctor('renderBody')
        });

        let style = {
            height: this.viewportHeight + 'px'
        };

        let slots = Arr.each(this.$slots, (slot, name) => {
            return this.$render('template', { slot: name }, slot);
        });

        let passes = {
            on: Obj.clone(this.$listeners), scopedSlots: this.$scopedSlots
        };

        if ( Any.isNumber(this.viewportHeight) ) {
            props.viewportHeight = this.viewportHeight - this.headerHeight;
        }

        let draggableHtml = this.$render('NDraggable', {
            ref: 'list', class: 'n-table__body', props, ...passes
        }, slots);

        return (
            <div class="n-table" style={style}>
                <NScrollbar class="n-table__wrap" relative={!this.viewportHeight}>
                    <div class="n-table__inner">
                        { [this.ctor('renderHead')(), draggableHtml] }
                    </div>
                </NScrollbar>
            </div>
        );
    },

}