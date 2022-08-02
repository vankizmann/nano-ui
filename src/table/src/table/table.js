import { Any, Arr, Obj, Dom, Event, UUID } from "@kizmann/pico-js";
import { h, resolveComponent } from "vue";

export default {

    name: 'NTable',

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

        draggable: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        visible: {
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
            }
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

        filter: {
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

        allowGroups: {
            default()
            {
                return ['default'];
            },
            type: [Array]
        },

        handle: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        safezone: {
            default()
            {
                return (height) => height * 0.51;
            }
        },

        showEmptyIcon: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        itemHeight: {
            default()
            {
                return 38;
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
                return false;
            }
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

        renderHandle: {
            default()
            {
                return false;
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

        renderCurrent: {
            default()
            {
                return true;
            }
        },

        transformDrop: {
            default()
            {
                return (node) => node;
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

        threshold: {
            default()
            {
                return 1;
            },
            type: [Number]
        },

        useKeys: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        keyEvents: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        highlightTimeout: {
            default()
            {
                return 7000;
            },
            type: [Number]
        },

    },

    computed: {

        checked()
        {
            return !!this.tempSelected.length &&
                this.tempSelected.length === this.items.length;
        },

        intermediate()
        {
            return !!this.tempSelected.length &&
                this.tempSelected.length !== this.items.length
        }

    },

    data()
    {
        return {
            uid: UUID(),
            elements: [],
            tempVisible: this.visible,
            tempVisibleProps: [],
            tempSelected: this.selected,
            tempSortProp: this.sortProp,
            tempSortDir: this.sortDir,
            tempFilter: this.filter,
            tempFilterProps: [],
        }
    },

    mounted()
    {
        this.$watch('tempVisible',
            this.makeVisibleProps, { deep: true });

        if ( !this.tempVisible.length ) {
            Arr.each(this.elements, this.detectVisible);
        }
    },

    watch: {

        selected(value)
        {
            this.tempSelected = value;
        },

    },

    methods: {

        addColumn(column)
        {
            Arr.add(this.elements, column,
                { uid: column.uid });
        },

        removeColumn(column)
        {
            Arr.remove(this.elements,
                { uid: column.uid });
        },

        getColumnIndex(column)
        {
            if ( !Any.isString(column) ) {
                column = column['prop'];
            }

            return Arr.findIndex(this.tempVisibleProps,
                column);
        },

        getColumnVisiblity(column)
        {
            if ( !Any.isString(column) ) {
                column = column.prop;
            }

            return Arr.has(this.tempVisible, column);
        },

        getColumnSorted(column)
        {
            let prop = column;

            if ( !Any.isString(prop) ) {
                prop = column.sortProp;
            }

            if ( Any.isEmpty(prop) ) {
                prop = column.prop;
            }

            if ( this.tempSortProp !== prop ) {
                return null;
            }

            return this.tempSortDir;
        },

        getColumnFilter(column)
        {
            let prop = column;

            if ( !Any.isString(prop) ) {
                prop = column.filterProp;
            }

            if ( Any.isEmpty(prop) ) {
                prop = column.prop;
            }

            return Arr.find(this.tempFilter, {
                property: prop
            });
        },

        getColumnFiltered(column)
        {
            let prop = column;

            if ( !Any.isString(prop) ) {
                prop = column.filterProp;
            }

            if ( Any.isEmpty(prop) ) {
                prop = column.prop;
            }

            return Arr.has(this.tempFilterProps, prop);
        },

        detectVisible(column)
        {
            if ( column.detectVisibity() ) {
                Arr.add(this.tempVisible, column.prop);
            }
        },

        makeVisibleProps()
        {
            this.tempVisibleProps = Arr.intersect(
                Arr.extract(this.elements, 'prop'), this.tempVisible);

            this.$nextTick(this.$refs.scrollbar.onResize);
        },

        sortByColumn(column)
        {
            let prop = column;

            if ( !Any.isString(prop) ) {
                prop = column.sortProp;
            }

            if ( Any.isEmpty(prop) ) {
                prop = column.prop;
            }


            let dir = this.tempSortDir;

            if ( prop === this.tempSortProp && this.tempSortDir === 'desc' ) {
                dir = 'asc';
            }

            if ( prop === this.tempSortProp && this.tempSortDir === 'asc' ) {
                dir = 'desc';
            }

            if ( this.tempSortDir !== dir ) {
                this.$emit('update:sortDir', this.tempSortDir = dir);
            }

            if ( this.tempSortProp !== prop ) {
                this.$emit('update:sortProp', this.tempSortProp = prop);
            }

            this.$emit('sort', this.tempSortProp, this.tempSortDir);
        },

        replaceFilter(filter, search)
        {
            Arr.replace(this.tempFilter, filter, search);

            let filters = Arr.filter(this.tempFilter, (filter) => {
                return Arr.has(this.tempFilterProps, filter.property);
            });

            this.$emit('update:filter', filters);

            this.$emit('filter', filters, this.tempFilterProps);
        },

        resetFilter()
        {
            this.tempFilter = this.tempFilterProps = [];

            Event.fire('NTable:reset', this.uid);

            this.$emit('update:filter', this.tempFilter);

            this.$emit('filter', this.tempFilter, this.tempFilterProps);
        },

        selectAll()
        {
            this.$refs.draggable.selectAll();
        },

        highlightNode(value, key = null)
        {
            this.$refs.draggable.highlightNode(value, key);
        },

        syncCurrent()
        {
            return this.$refs.draggable.syncCurrent();
        },

        refreshCurrent()
        {
            this.$refs.draggable.refreshCurrent();
        },

    },

    renderHandle()
    {
        if ( !this.renderHandle ) {
            return null;
        }

        return (
            <div class="n-draglist-item__handle">
                { /* Only used in row */}
            </div>
        )
    },

    renderExpand()
    {
        if ( !this.renderExpand ) {
            return null;
        }

        return (
            <div class="n-draglist-item__expand">
                { /* Only used in row */}
            </div>
        )
    },

    renderSelect()
    {
        if ( !this.renderSelect ) {
            return null;
        }

        let props = {
            modelValue: this.checked,
            intermediate: this.intermediate,
            disabled: !this.items.length,
            onClick: this.selectAll
        };

        return (
            <div class="n-draglist-item__select">
                <NCheckbox {...props}></NCheckbox>
            </div>
        );
    },

    renderBody(props)
    {
        let columns = Obj.each(this.elements, (column) => {
            return column.ctor('renderBody')(props);
        });

        return Obj.values(columns);
    },

    renderContext()
    {
        let columns = Obj.each(this.elements, (column) => {
            return (
                <NCheckbox class="n-table__checkbox" value={column.prop}>
                    {column.label}
                </NCheckbox>
            );
        });

        return (
            <NPopover trigger="context" width={140}>
                <NCheckboxGroup vModel={this.tempVisible} align="vertical">
                    {Obj.values(columns)}
                </NCheckboxGroup>
            </NPopover>
        );
    },

    renderHead()
    {
        let defaultRender = [
            this.ctor('renderHandle')(),
            this.ctor('renderExpand')(),
            this.ctor('renderSelect')(),
            this.ctor('renderContext')()
        ];

        let columns = Obj.each(this.elements, (column) => {
            return column.ctor('renderHead')();
        });

        return (
            <div class="n-table__header">
                {defaultRender} {Obj.values(columns)}
            </div>
        );
    },

    render()
    {
        let except = [
            'visible', 'filter', 'sortProp',
            'sortDir', 'closeFilterOnEnter'
        ];

        let props = Obj.except(this.$props, except, {
            items: this.items,
            selected: this.tempSelected,
            overflowX: false,
            useKeys: this.useKeys,
            // renderNode: this.ctor('renderBody')
        });

        props['onRowClick'] = (...args) => {
            this.$emit('row-click', ...args);
        }

        props['onRowDblclick'] = (...args) => {
            this.$emit('row-dblclick', ...args);
        }

        props['onUpdate:items'] = (value) => {
            this.$emit('update:items', value);
        }

        props['onUpdate:current'] = (value) => {
            this.$emit('update:current', value);
        }

        props['onUpdate:expanded'] = (value) => {
            this.$emit('update:expanded', value);
        }

        props['onUpdate:selected'] = (value) => {
            this.$emit('update:selected', this.tempSelected = value);
        }

        let draggableHtml = (
            <div class="n-table__body">
                <NDraglist ref="draggable" {...props} offsetX={25}>
                    {{ default: this.ctor('renderBody') }}
                </NDraglist>
            </div>
        );

        return (
            <div class="n-table">
                <NScrollbar ref="scrollbar" class="n-table__wrap" fixture={true} overflowY={false}>
                    <div class="n-table__inner">
                        {[this.ctor('renderHead')(), draggableHtml]}
                    </div>
                </NScrollbar>
                {this.$slots.default && this.$slots.default()}
            </div>
        );
    },

}