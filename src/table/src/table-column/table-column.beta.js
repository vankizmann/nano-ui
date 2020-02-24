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

        width: {
            default()
            {
                return 140;
            }
        },

        minWidth: {
            default()
            {
                return this.width;
            }
        },

        maxWidth: {
            default()
            {
                return 0;
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
        return { NTableColumn: this };
    },

    data()
    {
        return { veVisible: true, veWidth: 0 };
    },

    methods: {

        sortByColumn()
        {
            console.log('sort me');
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
            event.stopPropagation();

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

    mounted()
    {
        this.NTable.addColumn(this);

        this.NTable.$on('hook:resized', this.adjustResizerPosition);
        this.NTable.$on('hook:mounted', this.adjustResizerPosition);
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

        if ( this.sort ) {
            classList.push('is-sortable');
        }

        classList.push('is-desc');

        let index = Arr.findIndex(this.NTable.veColumns, {
            prop: this.prop
        });

        if ( ! index ) {
            classList.push('n-first');
        }

        if ( ! this.veWidth && index ) {
            this.veWidth = this.defaultWidth;
        }

        if ( this.veWidth ) {
            classList.push('n-fixed');
        }

        let style = {
            width: this.veWidth + 'px', minWidth: this.minWidth + 'px'
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
        if ( ! this.boundryEl ) {
            this.boundryEl = Dom.find(this.NTable.$el).find('.n-table__inner').get(0);
        }

        let labelHtml = (
            <div class="n-table-column__label">
                { this.label }
            </div>
        );

        let tooltipHtml = (
            <NPopover type="tooltip" boundry={this.boundryEl}>
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

        let events = {
            click: this.sortByColumn
        };

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
                <span class={this.icons.angleDown}></span>
            </div>,
            <NPopover class="n-popover-filter" trigger="click" boundry={this.boundryEl}>
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
        let NDraggable = this.NTable.$refs.list;

        let remote = Arr.find(NDraggable.veItems, {
            [NDraggable.uniqueProp]: props.value[NDraggable.uniqueProp]
        });

        let componentName = 'NTableCell' + Str.ucfirst(this.type);

        let classList = [
            'n-table-column', 'n-' + this.align
        ];

        let index = Arr.findIndex(this.NTable.veColumns, {
            prop: this.prop
        });

        if ( ! index ) {
            classList.push('n-first');
        }

        if ( this.veWidth ) {
            classList.push('n-fixed');
        }

        let width = this.veWidth;

        if ( ! index ) {
            width -= remote.depth * 20;
        }

        let style = {
            width: width + 'px'
        };

        if ( index ) {
            style.minWidth = this.minWidth + 'px';
        }

        props = Obj.assign(props, { column: this });

        return (
            <div class={classList} style={style}>
                { this.$render(componentName, { props }) }
            </div>
        );
    },

    render($render)
    {
        this.$render = $render;

        return null;
    }
}