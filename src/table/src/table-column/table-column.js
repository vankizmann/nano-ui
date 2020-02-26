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
                return this.fixedWidth || 140;
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
                return this.fixedWidth || 600;
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
                return Any.delay(this.bindAdaptWidth, 500);
            }

            // Disable fluid after fist run
            this.veFluid = false;

            // Adopt column width
            this.veWidth = Dom.find(this.$refs.column)
                .width();
        },

        sortByColumn(event)
        {
            if ( ! Dom.find(event.target).closest('.n-table-column__filter') ) {
                this.NTable.sortByColumn(this.prop);
            }
        },

        adjustResizerPosition()
        {
            if ( ! this.$refs.column ) {
                return Any.delay(this.adjustResizerPosition, 500);
            }

            this.veWidth = Dom.find(this.$refs.column).width();

            let style = {
                left: this.veWidth + 'px'
            };

            Dom.find(this.$refs.column).find('[data-resizer]').css(style);
        },

        eventResizerMousedown(event)
        {
            event.preventDefault();

            Dom.find(this.$refs.column).addClass('n-resize');

            Dom.find(document).on('mousemove',
                Any.framerate(this.eventResizerMousemove, 30), this._uid);

            Dom.find(document).on('mouseup',
                Any.framerate(this.eventResizerMouseup, 30), this._uid);
        },

        eventResizerMousemove(event)
        {
            this.clientX = event.clientX;

            event.preventDefault();

            let offsetX = Dom.find(this.$refs.column)
                .offset('left');

            let scrollX = Dom.find(this.$refs.column)
                .scroll('left');

            let targetWidth = (this.clientX + scrollX - offsetX);

            if ( this.minWidth ) {
                targetWidth = Math.max(targetWidth, this.minWidth)
            }

            if ( this.maxWidth ) {
                targetWidth = Math.min(targetWidth, this.maxWidth)
            }

            let style = {
                'left': targetWidth + 'px'
            };

            Dom.find(this.$refs.column).find('[data-resizer]').css(style);
        },

        eventResizerMouseup(event)
        {
            event.preventDefault();

            Dom.find(document).off('mousemove', null, this._uid);
            Dom.find(document).off('mouseup', null, this._uid);

            if ( ! this.clientX ) {
                return;
            }

            let offsetX = Dom.find(this.$refs.column)
                .offset('left');

            let scrollX = Dom.find(this.$refs.column)
                .scroll('left');

            let targetWidth = (this.clientX + scrollX - offsetX);

            if ( this.minWidth ) {
                targetWidth = Math.max(targetWidth, this.minWidth)
            }

            if ( this.maxWidth ) {
                targetWidth = Math.min(targetWidth, this.maxWidth)
            }

            this.veWidth = targetWidth;

            Dom.find(this.$refs.column).removeClass('n-resize');

            delete this.clientX;

            this.$nextTick(() => this.NTable.$emit('hook:resized'));
        }

    },

    beforeMount()
    {
        this.NTable.addColumn(this);
    },

    mounted()
    {
        this.NTable.$on('hook:resized', this.adjustResizerPosition);
        this.NTable.$on('hook:mounted', this.adjustResizerPosition);

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

        return (
            <div ref="column" class={classList} style={style}>
                { this.ctor('renderHeadSort')() }
                { this.ctor('renderHeadLabel')() }
                { this.ctor('renderHeadFilter')() }
                { this.ctor('renderHeadResizer')() }
            </div>
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

    renderHeadResizer()
    {
        let events = {
            mousedown: this.eventResizerMousedown
        };

        return (
            <div class="n-table-column__resizer" data-resizer="true" on={events}></div>
        );
    },

    renderBody(props)
    {
        if ( ! this.veWidth ) {
            return;
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