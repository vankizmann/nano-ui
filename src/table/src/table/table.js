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
            }
        },

        selected: {
            default()
            {
                return [];
            }
        },

        expanded: {
            default()
            {
                return [];
            }
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
                return (height) => height * 0.2;
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

        viewportHeight: {
            default()
            {
                return false;
            }
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
                return 100;
            },
            type: [Number]
        },

        preloadItems: {
            default()
            {
                return 30;
            },
            type: [Number]
        },

        bufferItems: {
            default()
            {
                return 30;
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
        }
    },

    methods: {

        addColumn(column)
        {
            Arr.add(this.veColumns, column, {
                prop: column.prop
            });
        },

        removeColumn(column)
        {
            Arr.remove(this.veColumns, {
                prop: column.prop
            });
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
        }

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

        let uniqueKey = UUID();

        if ( this.$refs.list && this.items.length ) {

            props['checked'] = this.$refs.list.isAllSelected(true);
            props['intermediate'] = this.$refs.list.isIntermediate(true);

            uniqueKey = Any.md5(this.$refs.list.veSelected);
        }

        return (
            <div class="n-draggable-item__select">
                <NCheckbox key={uniqueKey} props={props} on={events} />
            </div>
        );
    },

    renderBody(props)
    {
        return Arr.each(this.veColumns, (column) => {
            return column.ctor('renderBody')(props);
        });
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

        return (
            <div class="n-table__head">
                { [defaultRender, ...columnHtml] }
            </div>
        );
    },

    render($render)
    {
        this.$render = $render;

        let props = Obj.assign(Obj.clone(this.$props), {
            renderNode: this.ctor('renderBody')
        });

        let style = {
            height: this.viewportHeight + 'px'
        };

        let slots = Arr.each(this.$slots, (slot, name) => {
            return this.$render('template', { slot: name }, slot);
        });

        let passes = {
            on: this.$listeners, scopedSlots: this.$scopedSlots
        };

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