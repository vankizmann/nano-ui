import { Num, Obj, Any, Locale, Arr, Dom } from "nano-js";
import CtorMixin from "../../../mixins/src/ctor";

export default {

    name: 'NMatrix',

    props: {

        value: {
            default()
            {
                return null;
            }
        },

        items: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        multiple: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        use: {
            default()
            {
                return null;
            }
        },

        label: {
            default()
            {
                return Locale.trans('Structure');
            },
            type: [String]
        },

        titleProp: {
            default()
            {
                return 'title';
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

        matrixProp: {
            default()
            {
                return 'matrix';
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

        minWidth: {
            default()
            {
                return 200;
            },
            type: [Number]
        },

        itemHeight: {
            default()
            {
                return 30;
            }
        },

        adaptHeight: {
            default()
            {
                return null;
            }
        },

        defaultExpanded: {
            default()
            {
                return [];
            },
            type: [Array]
        },

    },

    methods: {

        ...CtorMixin,

        updateValue()
        {
            if ( this.multiple === true && ! Any.isEmpty(this.value) ) {
                this.nativeValue = this.value;
            }

            if ( this.multiple === false && ! Any.isEmpty(this.value) ) {
                this.nativeValue = [this.value];
            }
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

        addColumn(column)
        {
            let columns = Arr.merge(this.columns, [
                column
            ]);

            this.columns = Arr.sort(columns, '_uid');
        },

        removeColumn(column)
        {
            Arr.remove(this.columns, {
                _uid: column._uid
            });
        },

        toggleRow(row)
        {
            Arr.toggle(this.expanded, Obj.get(row, this.uniqueProp));
        },

        changeRow(row, value)
        {
            if ( this.multiple === false ) {
                this.nativeValue = [];
            }

            let fallback = {
                [this.uniqueProp]: Obj.get(row, this.uniqueProp),
                [this.matrixProp]: 0
            };

            let index = Arr.findIndex(this.nativeValue, {
                [this.uniqueProp]: Obj.get(row, this.uniqueProp)
            });

            if ( index === -1 ) {
                this.nativeValue.push(fallback);
            }

            let item = Arr.find(this.nativeValue, {
                [this.uniqueProp]: Obj.get(row, this.uniqueProp)
            });

            let matrix = Arr.toggle(
                Num.matrix(item[this.matrixProp]), value
            );

            item[this.matrixProp] = Num.combine(matrix);

            if ( this.multiple === true ) {
                return this.$emit('input', this.nativeValue);
            }

            this.$emit('input', Arr.first(this.nativeValue));
        },

        isChecked(row, value)
        {
            let item = Arr.find(this.nativeValue, {
                [this.uniqueProp]: Obj.get(row, this.uniqueProp)
            });

            if ( item === null ) {
                return false;
            }

            let matrix = Num.matrix(item[this.matrixProp]);

            if ( value === -1 ) {
                return true;
            }

            return Arr.has(matrix, value);
        }

    },

    provide()
    {
        return {
            NMatrix: this
        };
    },

    data()
    {
        return {
            height: 0,
            nativeValue: [],
            expanded: this.defaultExpanded,
            columns: []
        };
    },

    beforeMount()
    {
        this.updateValue();
    },

    mounted()
    {
        if ( this.adaptHeight === null ) {
            this.calculateHeight();
        }

        if ( this.adaptHeight !== null && this.adaptHeight !== false ) {
            this.$nextTick(this.bindObserver);
        }

        this.$watch('value', this.updateValue, { deep: true });
    },

    updated()
    {
        if ( this.adaptHeight === null ) {
            this.calculateHeight();
        }
    },

    renderHeadRow()
    {
        let className = [
            'n-matrix__row'
        ];

        return (
            <div class={className}>
                <div class="n-matrix__column n-matrix__column--item">
                    { this.$slots.label || this.label }
                </div>
                {
                    Arr.each(this.columns, (column) => {
                        return (
                            <div class="n-matrix__column" data-column-id={column._uid}>
                                { column.ctor('renderLabel')({ column: column }) }
                            </div>
                        );
                    })
                }
            </div>
        );
    },

    renderBodyRow(props)
    {
        let title = Obj.get(props.value, this.titleProp);

        let expanded = Arr.has(this.expanded,
            Obj.get(props.value, this.uniqueProp));

        let renderNode = (h, value, key) => {
            return this.ctor('renderBodyRow')({ value, key });
        };

        let items = Obj.get(props.value, this.childProp, []);

        let listProps = {
            items: items, itemHeight: this.itemHeight, renderNode: renderNode
        };

        let className = [
            'n-matrix__row', 'n-matrix__row--' + props.key
        ];

        if ( expanded === true ) {
            className.push('n-matrix__row--expanded');
        }

        if ( Any.isEmpty(items) === true ) {
            className.push('n-matrix__row--empty');
        }

        let toggleRow = () => {
            this.toggleRow(props.value);
        };

        return (
            <div class="n-matrix__group">
                <div class={className}>
                    <div class="n-matrix__column n-matrix__column--item" vOn:dblclick={toggleRow}>
                        <div class="n-matrix__expand" vOn:click={toggleRow}>
                            <span class={this.icons.angleRight}></span>
                        </div>
                        <div class="n-matrix__title">
                            { this.use ? this.h(this.use, { props }) : this.$slots.title || title }
                        </div>
                    </div>
                    {
                        Arr.each(this.columns, (column) => {
                            return (
                                <div class="n-matrix__column">
                                    { column.ctor('renderBody')({ column: column, row: props.value, key: props.key }) }
                                </div>
                            );
                        })
                    }
                </div>
                { expanded === true && Any.isEmpty(items) === false &&
                    <NRenderList props={listProps} />
                }
            </div>
        );
    },

    render(h)
    {
        this.h = h;

        let renderNode = (h, value, key) => {
            return this.ctor('renderBodyRow')({ value, key });
        };

        let listProps = {
            items: this.items, itemHeight: this.itemHeight, renderNode: renderNode
        };

        let style = {
            minWidth: this.minWidth + 'px'
        };

        if ( this.height > 0 ) {
            style.height = this.height + 'px';
        }

        return (
            <div class="n-matrix">
                <div ref="wrapper" class="n-matrix-wrapper" style={style}>
                    <div ref="head" class="n-matrix__head">
                        { this.ctor('renderHeadRow')() }
                    </div>
                    <div ref="body" class="n-matrix__body">
                        { Any.isEmpty(this.items) === false &&
                            h('NRenderList', { props: listProps })
                        }
                    </div>
                    { this.$slots.default }
                </div>
            </div>
        );
    }
}
