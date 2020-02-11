import CtorMixin from "../../../mixins/src/ctor";
import { Arr, Num, Dom, Any, Obj } from "nano-js";

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
            }
        },

        current: {
            default()
            {
                return null;
            }
        },

        visibleColumns: {
            default()
            {
                return null;
            }
        },

        uniqueProp: {
            default()
            {
                return '_dragid';
            },
            type: [String, Array]
        },

        itemHeight: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        adaptHeight: {
            default()
            {
                return null;
            }
        },

        selectedKeys: {
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

        filterProps: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        group: {
            default()
            {
                return ['default'];
            },
            type: [Array]
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

        allowDrag: {
            default()
            {
                return () => true;
            }
        },

        allowDrop: {
            default()
            {
                return () => false;
            }
        },

    },

    computed: {

        selected()
        {
            let selected = Arr.each(this.nativeSelectedKeys, (key) => {
                return Arr.find(this.items, { [this.uniqueProp]: key });
            });

            return Arr.clone(selected);
        },

        rowStyle()
        {
            return {
                height: Num.fixed(this.itemHeight) + 'px'
            };
        },

    },

    methods: {

        ...CtorMixin,

        addColumn(column)
        {
            this.columns.push(column);
        },

        getColumnEl(column)
        {
            let selector = '[data-column-id="' + column._uid + '"]';

            return Dom.find(this.$el).find(selector).get(0);
        },

        resizeColumn(event, column)
        {
            let target = event.target.parentNode;

            Dom.find(document).on('mousemove', Any.throttle((event) => {

                event.preventDefault();
                event.stopPropagation();

                let width = event.clientX - Dom.find(target).offsetLeft() +
                    Dom.find(target).scrollLeft(null, window);

                if ( column.width !== width ) {
                    column.setWidth(width);
                }

            }, 10), { _uid: this._uid });

            Dom.find(document).on('mouseup', Any.throttle(() => {

                Dom.find(document).off('mousemove',
                    null, { _uid: this._uid });

                Dom.find(document).off('mouseup',
                    null, { _uid: this._uid });

            }, 10), { _uid: this._uid });
        },

        sortColumn(prop, direction = null)
        {
            let cache = this.nativeSortDir;

            if ( cache === 'asc' && this.nativeSortProp === prop ) {
                this.nativeSortDir = 'desc';
            }

            if ( cache === 'desc' && this.nativeSortProp === prop ) {
                this.nativeSortDir = 'asc';
            }

            if ( direction !== null ) {
                this.nativeSortDir = direction;
            }

            this.nativeSortProp = prop;

            this.$emit('update:sortDir', this.nativeSortDir);
            this.$emit('update:sortProp', this.nativeSortProp);

            this.$emit('sort', this.nativeSortProp, this.nativeSortDir)
        },

        filterColumn(prop, filter)
        {
            Arr.remove(this.nativeFilterProps, {
                property: prop
            });

            Arr.push(this.nativeFilterProps, filter);

            this.$emit('update:filterProps', this.nativeFilterProps);
            this.$emit('filter', this.nativeFilterProps);
        },

        calculateHeight()
        {
            this.height = Dom.find(this.$refs.head).height() +
                Dom.find(this.$refs.body).child().height() + 1;
        },

        bindObserver()
        {
            let element = this.$el.parentNode;

            if ( this.adaptHeight !== true ) {
                element = this.adaptHeight;
            }

            Dom.find(element).observerResize(this.updateObserver)(element);
        },

        updateObserver()
        {
            let element = this.$el.parentNode;

            if ( this.adaptHeight !== true ) {
                element = this.adaptHeight;
            }

            this.height = Dom.find(element).innerHeight();
        },

        selectPrevious()
        {
            let total = this.items.length;

            if ( total === 0 ) {
                return;
            }

            let keys = Arr.each(this.items, (item) => {
                return Obj.get(item, this.uniqueProp);
            });

            if ( Any.isEmpty(this.currentKey) === true ) {
                return this.currentKey = Arr.last(keys);
            }

            let index = Arr.findIndex(keys, this.currentKey);

            if ( index === 0 ) {
                return this.currentKey = Arr.last(keys);
            }

            this.currentKey = Arr.get(keys, index - 1);
        },

        selectNext()
        {
            let total = this.items.length;

            if ( total === 0 ) {
                return;
            }

            let keys = Arr.each(this.items, (item) => {
                return Obj.get(item, this.uniqueProp);
            });

            if ( Any.isEmpty(this.currentKey) === true ) {
                return this.currentKey = Arr.first(keys);
            }

            let index = Arr.findIndex(keys, this.currentKey);

            if ( index === total - 1 ) {
                return this.currentKey = Arr.first(keys);
            }

            this.currentKey = Arr.get(keys, index + 1);
        },

        tableKeydown(event)
        {
            if ( event.keyCode === 38 || event.keyCode === 40 ) {
                event.preventDefault();
            }

            if ( event.keyCode === 38 ) {
                this.selectPrevious();
            }

            if ( event.keyCode === 40 ) {
                this.selectNext();
            }
        },

        getVisibleColumns()
        {
            let visible = [];

            Arr.each(this.columns, (column) => {
                if ( column.breakpoint <= Dom.find(this.$el).width() && column.visible ) {
                    visible.push(column.prop);
                }
            });

            return visible;
        },

        clearSelectedKeys()
        {
            this.nativeSelectedKeys = [];
        }

    },

    watch: {

        scroll()
        {
            Arr.each(this.columns, (column) => {
                column.setWidth(0, true);
            });
        },

        currentKey()
        {
            let current = Arr.find(this.items, {
                [this.uniqueProp]: this.currentKey
            });

            this.$emit('update:current', current);
        },

        selectedKeys()
        {
            if ( ! Any.isEqual(this.nativeSelectedKeys, this.selectedKeys) ) {
                this.nativeSelectedKeys = this.selectedKeys;
            }
        },

        nativeSelectedKeys()
        {
            this.$emit('update:selectedKeys', this.nativeSelectedKeys);
        },

        nativeVisibleColumns()
        {
            this.$emit('update:visibleColumns', this.nativeVisibleColumns);
        }

    },

    data()
    {
        return {
            width: 0,
            height: 0,
            scroll: false,
            visible: 0,
            columns: [],
            nativeVisibleColumns: [],
            currentKey: null,
            nativeSelectedKeys: this.selectedKeys,
            nativeSortProp: this.sortProp,
            nativeSortDir: this.sortDir,
            nativeFilterProps: this.filterProps
        }
    },

    provide()
    {
        return {
            NTable: this
        };
    },

    mounted()
    {
        Dom.find(document).on('keydown',
            this.tableKeydown, { _uid: this._uid });

        this.nativeVisibleColumns = this.visibleColumns ||
            this.getVisibleColumns();

        this.width = Arr.reduce(this.columns, (count, column) => {
            return count + column.width;
        }, 0);

        if ( this.adaptHeight === null ) {
            this.calculateHeight();
        }

        if ( this.adaptHeight !== null && this.adaptHeight !== false ) {
            this.$nextTick(this.bindObserver);
        }
    },

    updated()
    {
        if ( this.adaptHeight === null ) {
            this.calculateHeight();
        }

        this.scroll = this.$refs.body.scrollHeight >
            this.$refs.body.clientHeight;

        this.visible = this.$refs.body.offsetWidth -
            this.$refs.body.clientWidth;
    },

    destroyed()
    {
        Dom.find(document).off('keydown',
            null, { _uid: this._uid });
    },

    renderHeadRow()
    {
        return (
            <div class="n-table__row">
                {
                    Arr.each(this.columns, (column) => {

                        if ( Arr.has(this.nativeVisibleColumns, column.prop) === false ) {
                            return null;
                        }

                        let className = [
                            'n-table__column',
                            'n-table__column--' + column.align,
                            'n-table__column--' + column.type
                        ];

                        if ( column.autosize === true ) {
                            className.push('n-table__column--auto');
                        }

                        if ( column.fixed === true ) {
                            className.push('n-table__column--fixed');
                        }

                        if ( column.resize === true && column.fixedWidth === 0 ) {
                            className.push('n-table__column--resizable');
                        }

                        let filter = Arr.find(this.nativeFilterProps, {
                            property: column.prop
                        });

                        if ( filter !== null && Any.isEmpty(filter.value) === false ) {
                            className.push('n-table__column--filtered');
                        }

                        let events = {};

                        if ( column.resize === true ) {
                            events.mousedown = (e) => this.resizeColumn(e, column);
                        }

                        let resizer = (
                            <div class="n-table__resizer" on={events}>
                                <span></span>
                            </div>
                        );

                        return (
                            <div class={className} style={column.style} data-column-id={column._uid}>
                                { [column.$scopedSlots.label({ column: column }), resizer] }
                            </div>
                        );
                    })
                }
            </div>
        );
    },

    renderBodyRow(props)
    {
        let uniqueValue = Obj.get(props.value, this.uniqueProp);

        let className = [
            'n-table__row', 'n-table__row--' + props.key
        ];

        if ( this.currentKey === uniqueValue ) {
            className.push('n-table__row--current');
        }

        let onClick = () => {
            this.currentKey = uniqueValue;
        };

        let onDblClick = () => {
            this.$emit('row-dblclick', {
                row: props.value, key: props.key
            });
        };

        return (
            <div class={className} style={this.rowStyle} vOn:click={onClick} vOn:dblclick={onDblClick}>
                {
                    Arr.each(this.columns, (column) => {

                        if ( Arr.has(this.nativeVisibleColumns, column.prop) === false ) {
                            return null;
                        }

                        let className = [
                            'n-table__column',
                            'n-table__column--' + column.align,
                            'n-table__column--' + column.type
                        ];

                        if ( column.autosize === true ) {
                            className.push('n-table__column--auto');
                        }

                        if ( column.fixed === true ) {
                            className.push('n-table__column--fixed');
                        }

                        return (
                            <div class={className} style={column.style}>
                                { column.$scopedSlots.default({ column: column, row: props.value, key: props.key }) }
                            </div>
                        );
                    })
                }
            </div>
        );
    },

    render(h)
    {
        this.h = h;

        let scopedSlots = {
            default: (props) => {
                return this.ctor('renderBodyRow')(props);
            }
        };

        let emptySlot = (
            <div class="n-draggable__empty n-table__empty" slot="empty">
                { this.$slots.empty }
            </div>
        );

        let props = {
            items: this.items,
            selected: this.selected,
            itemHeight: this.itemHeight,
            group: this.group,
            insertNode: this.insertNode,
            removeNode: this.removeNode,
            allowDrag: this.allowDrag,
            allowDrop: this.allowDrop,
        };

        let events = {

            'input': () => {
                this.nativeSelectedKeys = [];
            },

            'update:selected': (selected) => {
                this.nativeSelectedKeys = Arr.each(selected,
                    (item) => item[this.uniqueProp]);
            }

        };

        let style = {};

        if ( this.height > 0 ) {
            style.height = this.height + 'px';
        }

        let classList = [
            'n-table'
        ];

        if ( this.scroll === true ) {
            classList.push('n-table--scroll');
        }

        if ( this.visible !== 0 ) {
            classList.push('n-table--visible');
        }

        return (
            <div class={classList}>
                <NCheckboxGroup vModel={this.nativeSelectedKeys}>
                    <div ref="wrapper" class="n-table-wrapper" style={style}>
                        <div ref="head" class="n-table__head">
                            { this.ctor('renderHeadRow')() }
                        </div>
                        <NPopover trigger="context">
                            <NCheckboxGroup vModel={this.nativeVisibleColumns}>
                                {
                                    Arr.each(this.columns, (column) => {
                                        return <NCheckbox size="small" value={column.prop}>{ column.label }</NCheckbox>;
                                    })
                                }
                            </NCheckboxGroup>
                        </NPopover>
                        <div ref="body" class="n-table__body">
                            {
                                h('NDraggable', { props: props, on: events, scopedSlots }, [
                                    this.$slots.empty && emptySlot
                                ])
                            }
                        </div>
                        { this.$slots.default }
                    </div>
                </NCheckboxGroup>
            </div>
        );
    }

}
