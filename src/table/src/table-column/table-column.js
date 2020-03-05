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

        breakpoint: {
            default()
            {
                return 0;
            },
            type: [Number]
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
            veVisible: true, veWidth: 0, veFluid: this.fluid
        };
    },

    methods: {

        bindAdaptWidth()
        {
            if ( ! this.veVisible ) {
                return;
            }

            if ( ! this.$refs.column ) {
                return Any.delay(this.bindAdaptWidth, 10);
            }

            // Disable fluid after fist run
            this.veFluid = false;

            // Bind mounted hook to get real sizes
            this.NTable.$on('hook:mounted', this.$refs.column.refresh);
        },

        sortByColumn(event)
        {
            if ( ! Dom.find(event.target).closest('.n-table-column__filter') ) {
                this.NTable.sortByColumn(this.prop);
            }
        },

        eventResizerInput(value)
        {
            this.veWidth = value;

            this.$nextTick(() => this.NTable.$emit('hook:resized'));
        }

    },

    beforeMount()
    {
        this.NTable.addColumn(this);
    },

    mounted()
    {
        this.bindAdaptWidth()
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
            classList.push('is-sorted is-' + this.NTable.veSortDir);
        }

        if ( this.veFluid ) {
            classList.push('n-fluid');
        }

        if ( this.veWidth ) {
            classList.push('n-fixed');
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

        let props = {
            width: this.veWidth,
            minWidth: this.minWidth,
            maxWidth: this.maxWidth,
            disabled: !! this.fixedWidth,
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
                { this.label }
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

        return [
            <div class="n-table-column__filter">
                <div><span class={this.icons.angleDown}></span></div>
            </div>,
            <NPopover class="n-popover-filter" trigger="click" boundary={this.boundaryEl}>
                { this.$render(componentName, { slot: 'raw', props }) }
            </NPopover>
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
            'n-table-column', 'n-' + this.align
        ];

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
            width -= remote.depth * 20;
        }

        let style = {
            width: width + 'px',
        };

        if ( index ) {
            style.minWidth = this.minWidth + 'px';
        }

        props = Obj.assign(props, { column: this });

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