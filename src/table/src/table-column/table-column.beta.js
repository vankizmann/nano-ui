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
        return { veVisible: true, width: 0 };
    },

    methods: {

        adjustResizerPosition()
        {
            if ( ! this.$refs.column ) {
                return Any.delay(this.adjustResizerPosition, 500);
            }

            let offsetX = Dom.find(this.$refs.column)
                .offset('left', this.NTable.$el);

            this.width = Dom.find(this.$refs.column).width();

            let style = {
                left: (this.width + offsetX) + 'px'
            };

            console.log(style);

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

            let scrollX = Dom.find(this.$refs.column)
                .scroll('left');

            let style = {
                'left': (this.clientX + scrollX - offsetX + 2) + 'px'
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

            this.width = scrollX + this.clientX - offsetX + 2;

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
            'n-table-column'
        ];

        let index = Arr.findIndex(this.NTable.veColumns, {
            prop: this.prop
        });

        if ( ! index ) {
            classList.push('n-first');
        }

        if ( ! this.width && index ) {
            this.width = this.defaultWidth;
        }

        if ( this.width ) {
            classList.push('n-fixed');
        }

        let style = {
            width: this.width + 'px'
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
        let boundryEl = Dom.find(this.NTable.$el)
            .find('.n-table__inner').get(0);

        console.log(boundryEl);

        let labelHtml = (
            <div class="n-table-column__label">
                { this.label }
            </div>
        );

        let tooltipHtml = (
            <NPopover type="tooltip" boundry={boundryEl}>
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
        let remote = Arr.find(this.NDraggable.veItems, {
            [this.NDraggable.uniqueProp]: props.value[this.NDraggable.uniqueProp]
        });

        let componentName = 'NTableCell' + Str.ucfirst(this.type);

        let classList = [
            'n-table-column'
        ];

        let index = Arr.findIndex(this.NTable.veColumns, {
            prop: this.prop
        });

        if ( ! index ) {
            classList.push('n-first');
        }

        if ( ! this.width && index ) {
            this.width = this.defaultWidth;
        }

        if ( this.width ) {
            classList.push('n-fixed');
        }

        let width = this.width;

        if ( ! index ) {
            width -= remote.depth * 20;
        }

        let style = {
            width: width + 'px'
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