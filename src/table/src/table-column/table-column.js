import { Any, Arr, Obj, Str, Dom } from "nano-js";

export default {

    name: 'NTableColumn',

    inject: {

        NDraggable: {
            default: undefined
        },

        NTable: {
            default: undefined
        }

    },

    props: {

        value: {
            default()
            {
                return null;
            }
        },

        prop: {
            default()
            {
                return 'id';
            },
            type: [String]
        },

        label: {
            default()
            {
                return '';
            },
            type: [String]
        },

        tooltip: {
            default()
            {
                return this.label;
            },
            type: [String]
        },

        type: {
            default()
            {
                return 'string';
            },
            type: [String]
        },

        align: {
            default()
            {
                return 'left';
            },
            type: [String]
        },

        sort: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        filter: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        resize: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        visible: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean, Function]
        },

        breakpoint: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        matrix: {
            default()
            {
                return 1;
            },
            type: [Number, String]
        },

        options: {
            default()
            {
                return [];
            },
            type: [Object, Array, Function]
        },

        optionsValue: {
            default()
            {
                return '$value';
            },
            type: [String]
        },

        optionsLabel: {
            default()
            {
                return '$value';
            },
            type: [String]
        },

        sortProp: {
            default()
            {
                return this.prop;
            },
            type: [String]
        },

        filterProp: {
            default()
            {
                return this.prop;
            },
            type: [String]
        },

        fluid: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        fixedWidth: {
            default()
            {
                return 0;
            }
        },

        width: {
            default()
            {
                return this.fixedWidth || 170;
            }
        },

        minWidth: {
            default()
            {
                return this.fixedWidth || 120;
            }
        },

        maxWidth: {
            default()
            {
                return this.fixedWidth || 9999;
            }
        },

        emptyText: {
            default()
            {
                return this.trans('-');
            },
            type: [String]
        },

        undefinedText: {
            default()
            {
                return this.trans('-');
            },
            type: [String]
        },

        trueText: {
            default()
            {
                return this.trans('Yes');
            },
            type: [String]
        },

        falseText: {
            default()
            {
                return this.trans('No');
            },
            type: [String]
        },

        datetimeFormat: {
            default()
            {
                return this.trans('YYYY-MM-DD HH:mm');
            },
            type: [String]
        }

    },

    provide()
    {
        return {
            NTableColumn: this
        };
    },

    data()
    {
        return {
            veWidth: 0,
            veValue: this.value,
            veVisible: this.visible,
            veFluid: this.fluid,
        };
    },

    methods: {

        bindAdaptWidth()
        {
            if ( ! this.$refs.column ) {
                return Any.delay(this.bindAdaptWidth, 10);
            }

            // Disable fluid after fist run
            this.veFluid = false;

            // Bind mounted hook to get real sizes
            this.$refs.column.refresh();
        },

        detectVisibity()
        {
            let visible = this.visible;

            if ( this.breakpoint ) {
                visible &= this.NTable.$el.innerWidth
                    > this.breakpoint;
            }

            if ( visible ) {
                this.NTable.showColumn(this);
            }
        },

        sortByColumn(event)
        {
            if ( ! Dom.find(event.target).closest('.n-table-column__filter') ) {
                this.NTable.sortByColumn(this.prop);
            }
        },

        eventResizerInput(value)
        {
            this.veWidth = value || this.width;

            this.$nextTick(() => this.NTable.$emit('hook:resized'));
        }

    },

    watch: {

        value()
        {
            if ( this.value !== this.veValue ) {
                this.veValue = this.value;
            }
        }

    },

    beforeMount()
    {
        this.NTable.addColumn(this);
    },

    beforeDestroy()
    {
        this.NTable.removeColumn(this);
    },

    renderHead()
    {
        let classList = [
            'n-table-column', 'n-' + this.align
        ];

        if ( this.NTable.veSortProp === this.prop ) {
            classList.push('is-sorted');
            classList.push('is-' + this.NTable.veSortDir);
        }

        if ( this.veFluid ) {
            classList.push('n-fluid');
        }

        if ( this.veWidth ) {
            classList.push('n-fixed');
        }

        let filterIndex = Arr.findIndex(this.NTable.filterProps, {
            property: this.prop
        });

        if ( filterIndex !== -1 ) {
            classList.push('n-filtered');
        }

        let width = this.veWidth;

        if ( ! this.veWidth ) {
            width = this.width;
        }

        let style = {
            width: width + 'px',
            minWidth: this.minWidth + 'px',
            maxWidth: this.maxWidth + 'px'
        };

        if ( this.NTable.columnHidden(this) ) {
            style.display = 'none';
        }

        let props = {
            width: this.veWidth,
            minWidth: this.minWidth,
            maxWidth: this.maxWidth,
            disabled: !! this.fixedWidth,
            bootRefresh: false
        };

        let events = {
            input: this.eventResizerInput
        };

        return (
            <NResizer ref="column" class={classList} style={style} props={props} on={events}>
                { this.ctor('renderHeadSort')() }
                { this.ctor('renderHeadLabel')() }
                { this.ctor('renderHeadFilter')() }
            </NResizer>
        );
    },

    renderHeadLabel()
    {
        if ( ! this.boundaryEl ) {
            this.boundaryEl = Dom.find(this.NTable.$el)
                .find('.n-table__inner').get(0);
        }

        let events = {};

        if ( this.sort && this.NTable.sortOnLabel ) {
            events.click = this.sortByColumn;
        }

        let labelHtml = (
            <div class="n-table-column__label" on={events}>
                { this.label }
            </div>
        );

        let tooltipHtml = (
            <NPopover type="tooltip" boundary={this.boundaryEl}>
                { this.tooltip }
            </NPopover>
        );

        return [labelHtml, tooltipHtml];
    },

    renderHeadSort()
    {
        if ( ! this.sort ) {
            return null;
        }

        let events = {};

        if ( this.sort && ! this.NTable.sortOnLabel ) {
            events.click = this.sortByColumn;
        }

        return (
            <div class="n-table-column__sort" on={events}>
                <div></div>
            </div>
        )
    },

    renderHeadFilter()
    {
        if ( ! this.filter ) {
            return null;
        }

        let componentName = 'NTableFilter' + Str.ucfirst(this.type);

        let props = {
            column: this
        };

        let angleHtml = (
            <div class="n-table-column__filter">
                <div><span class={this.icons.angleDown}></span></div>
            </div>
        );

        return [
            angleHtml, this.$render(componentName, { props })
        ];
    },

    renderBody(props)
    {
        if ( ! this.veWidth ) {
            return null;
        }

        let NDraggable = this.NTable.$refs.list;

        let remote = Arr.find(NDraggable.veItems, {
            [NDraggable.uniqueProp]: props.value[NDraggable.uniqueProp]
        });

        let componentName = 'NTableCell' + Str.ucfirst(this.type);

        let classList = [
            'n-table-column',
            'n-table-column--' + this.type
        ];

        classList.push('n-' + this.align);

        if ( this.veFluid ) {
            classList.push('n-fluid');
        }

        if ( this.veWidth ) {
            classList.push('n-fixed');
        }

        let index = Arr.findIndex(this.NTable.veColumns, {
            prop: this.prop
        });

        let width = this.veWidth;

        if ( ! index ) {
            width -= remote.depth * this.NTable.itemOffset;
        }

        let style = {
            width: width + 'px',
        };

        if ( index ) {
            style.minWidth = this.minWidth + 'px';
        }

        if ( this.NTable.columnHidden(this) ) {
            style.display = 'none';
        }

        let getTarget = () => {
            return this.NDraggable.getTarget(props.value);
        };

        props = Obj.assign(props, { column: this, getTarget });

        return (
            <div class={classList} style={style}>
                { this.$scopedSlots.default ? this.$scopedSlots.default(props) : this.$render(componentName, { props }) }
            </div>
        );
    },

    render($render)
    {
        this.$render = $render;

        return null;
    }
}