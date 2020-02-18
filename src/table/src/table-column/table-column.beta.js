import { Any, Arr, Obj, Str, Dom } from "nano-js";

export default {

    name: 'NTableColumn',

    inject: {

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

        basis: {
            default()
            {
                return 1;
            },
            type: [Number]
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

        defaultWidth: {
            default()
            {
                return 100;
            }
        },

        fixedWidth: {
            default()
            {
                return 0;
            }
        },

        minWidth: {
            default()
            {
                return this.fixedWidth || this.defaultWidth;
            }
        },

        maxWidth: {
            default()
            {
                return this.fixedWidth || 0;
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
        return { width: 0 };
    },

    methods: {

        adjustResizerPosition()
        {
            if ( ! this.$refs.column ) {
                return Any.delay(this.adjustResizerPosition, 500);
            }

            let offsetX = Dom.find(this.$refs.column)
                .offset('left', this.NTable.$el);

            let width = Dom.find(this.$refs.column).width();

            let style = {
                left: (width + offsetX) + 'px'
            };

            Dom.find(this.$refs.column).find('[data-resizer]').css(style);
        },

        eventResizerMousedown(event)
        {
            event.preventDefault();
            event.stopPropagation();

            Dom.find(this.$refs.column).addClass('n-resize');

            Dom.find(document).on('mousemove',
                Any.framerate(this.eventResizerMousemove), this._uid);

            Dom.find(document).on('mouseup',
                Any.framerate(this.eventResizerMouseup), this._uid);
        },

        eventResizerMousemove(event)
        {
            this.clientX = event.clientX;

            event.preventDefault();

            let offsetX = Dom.find(this.NTable.$el)
                .offset('left');

            let style = {
                'left': (this.clientX - offsetX - 2) + 'px'
            };

            Dom.find(this.$refs.column).find('[data-resizer]').css(style);
        },

        eventResizerMouseup(event)
        {
            event.preventDefault();

            Dom.find(document).off('mousemove', null, this._uid);
            Dom.find(document).off('mouseup', null, this._uid);

            let offsetX = Dom.find(this.$refs.column)
                .offset('left');

            this.width = this.clientX - offsetX - 2;

            Dom.find(this.$refs.column).removeClass('n-resize');

            this.$nextTick(() => this.NTable.$emit('hook:resized'));
        }

    },

    mounted()
    {
        this.NTable.addColumn(this);

        this.NTable.$on('hook:resized', this.adjustResizerPosition);

        this.NTable.$on('hook:mounted', this.adjustResizerPosition);
    },

    renderHead()
    {
        let classList = [
            'n-table-column', !! this.width && 'n-fixed'
        ];

        if ( ! Arr.findIndex(this.NTable.veColumns, { prop: this.prop }) ) {
            classList.push('n-first');
        }

        let style = {
            width: (this.width || this.defaultWidth) + 'px'
        };

        return (
            <div ref="column" class={classList} style={style}>
                { this.ctor('renderHeadLabel')() }
                { this.ctor('renderHeadFilter')() }
                { this.ctor('renderHeadResizer')() }
            </div>
        );
    },

    renderHeadLabel()
    {
        let labelHtml = (
            <div class="n-table-column__label">
                { this.label }
            </div>
        );

        let tooltipHtml = (
            <NPopover type="tooltip" boundry={this.NTable.$el}>
                { this.label }
            </NPopover>
        );

        return [labelHtml, tooltipHtml];
    },

    renderHeadFilter()
    {
        return null;
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
        let componentName = 'NTableCell' + Str.ucfirst(this.type);

        let classList = [
            'n-table-column', !! this.width && 'n-fixed'
        ];

        if ( ! Arr.findIndex(this.NTable.veColumns, { prop: this.prop }) ) {
            classList.push('n-first');
        }

        let style = {
            width: (this.width || this.defaultWidth) + 'px'
        };

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