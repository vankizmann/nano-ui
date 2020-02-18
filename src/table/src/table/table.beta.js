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

        displayItems: {
            default()
            {
                return null;
            }
        },

        selected: {
            default()
            {
                return [];
            }
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

        renderCollapse: {
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

        bufferItems: {
            default()
            {
                return 8;
            },
            type: [Number]
        },

        updateDelay: {
            default()
            {
                return 0;
            },
            type: [Number]
        }

    },

    provide()
    {
        return { NTable: this };
    },

    data()
    {
        return { veColumns: [] }
    },

    methods: {

        addColumn(column)
        {
            Arr.add(this.veColumns, column, {
                prop: column.prop
            });
        },

        toggleSelected()
        {
            this.$refs.list.toggleAllItems(
                this.$refs.list.isIntermediate()
            );
        }

    },

    renderCollapse()
    {
        if ( ! this.renderCollapse ) {
            return null;
        }

        return (
            <div class="n-draggable-item__collapse">
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
            checked: false,
            intermediate: false,
            disabled: false
        };

        if ( this.$refs.list ) {
            props['checked'] = this.$refs.list.isAllSelected();
            props['intermediate'] = this.$refs.list.isIntermediate();
            props['disabled'] = ! this.$refs.list.isSelectable();
        }

        return (
            <div class="n-draggable-item__select">
                <NCheckbox key={UUID()} props={props} on={events} />
            </div>
        )
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
            this.ctor('renderCollapse')(),
            this.ctor('renderSelect')()
        ];

        let columnHtml = Arr.each(this.veColumns, (column) => {
            return column.ctor('renderHead')();
        });

        let style = {
            minHeight: this.itemHeight + 'px'
        };

        return (
            <div class="n-table__head" style={style}>
                { Arr.merge(defaultRender, columnHtml) }
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

        return (
            <div class="n-table" style={style}>
                <NScrollbar class="n-table__inner">
                    { this.ctor('renderHead')() }
                    <NDraggable ref="list" class="n-table__body" props={props} on={this.$listeners} />
                    { this.$slots.default }
                </NScrollbar>
            </div>
        );
    },

}