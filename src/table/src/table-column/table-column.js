import { Any, Arr, Obj, Str, Dom, UUID } from "@kizmann/pico-js";
import { h, resolveComponent } from "vue";

export default {

    name: 'NTableColumn',

    inject: {

        NTable: {
            default: undefined
        }

    },

    props: {

        modelValue: {
            default()
            {
                return null;
            }
        },

        prop: {
            default()
            {
                return UUID();
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

        previewProp: {
            default()
            {
                return 'preview';
            },
            type: [String]
        },

        matrix: {
            default()
            {
                return -1;
            },
            type: [Number, String]
        },

        matrixProp: {
            default()
            {
                return 'matrix';
            },
            type: [String]
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
                return '';
            },
            type: [String]
        },

        filterProp: {
            default()
            {
                return '';
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
                return 0;
            }
        },

        minWidth: {
            default()
            {
                return 120;
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
                return '-';
            },
            type: [String]
        },

        undefinedText: {
            default()
            {
                return '-';
            },
            type: [String]
        },

        trueText: {
            default()
            {
                return 'Yes';
            },
            type: [String]
        },

        falseText: {
            default()
            {
                return 'No';
            },
            type: [String]
        },

        datetimeFormat: {
            default()
            {
                return 'YYYY-MM-DD HH:mm';
            },
            type: [String]
        },

        allowUncheck: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

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
            uid: UUID(), tempWidth: 0,
        };
    },

    methods: {

        detectVisibity()
        {
            let visible = this.visible;

            if ( this.breakpoint ) {
                visible &= Dom.find(this.NTable.$el).width() > this.breakpoint;
            }

            return visible;
        },

        sortByColumn(event)
        {
            if ( ! Arr.has([0, 1], event.which) ) {
                return;
            }
            
            if ( ! Dom.find(event.target).closest('.n-table-column__filter') ) {
                this.NTable.sortByColumn(this);
            }
        },

    },

    beforeMount()
    {
        this.prevRender = {};
        this.changedStates = {};
        this.NTable.addColumn(this);
    },

    beforeUnmount()
    {
        this.NTable.removeColumn(this);
    },

    renderHead()
    {
        if ( ! this.NTable.getColumnVisiblity(this) ) {
            return null;
        }

        let classList = [
            'n-table-column', 
            'n-table-column--' + this.align,
            'n-table-column--' + this.type,
        ];

        let sortDirection = this.NTable.getColumnSorted(this);

        if ( sortDirection ) {
            classList.push('n-sorted', 'n-' + sortDirection);
        }

        if ( this.fluid || ! this.width ) {
            classList.push('n-fluid');
        }

        if ( this.fixedWidth ) {
            classList.push('n-fixed');
        }

        if ( this.NTable.getColumnFiltered(this)  ) {
            classList.push('n-filtered');
        }

        let style = {};

        if ( this.fixedWidth ) {
            style.width = this.fixedWidth + 'px';
        }

        let props = {
            modelValue: this.tempWidth,
            width: this.width,
            minWidth: this.minWidth,
            maxWidth: this.maxWidth,
            disabled: !! this.fixedWidth,
            group: [this.NTable.uid],
        };

        props['onUpdate:modelValue'] = (value) => {
            this.prevRender = {}; this.tempWidth = value;
        }

        if ( this.sort ) {
            props.onMousedown = this.sortByColumn;
        }

        return (
            <NResizer ref="column" class={classList} style={style} {...props}>
                { this.ctor('renderHeadSort')() }
                { this.ctor('renderHeadLabel')() }
                { this.ctor('renderHeadFilter')() }
            </NResizer>
        );
    },

    renderHeadLabel()
    {
        let classList = [
            'n-table-column__label'
        ];

        let labelHtml = (
            <div class={classList}>
                <span>{ this.label }</span>
            </div>
        );

        if ( Any.isEmpty(this.tooltip) ) {
            return labelHtml;
        }

        let tooltipHtml = (
            <NPopover type="tooltip">{ this.tooltip }</NPopover>
        );

        return [labelHtml, tooltipHtml];
    },

    renderHeadSort()
    {
        if ( ! this.sort ) {
            return null;
        }

        return (
            <div class="n-table-column__sort">
                <i>{ /* Sorting angles */ }</i>
            </div>
        )
    },

    renderHeadFilter()
    {
        if ( ! this.filter ) {
            return null;
        }

        let angleHtml = (
            <div class="n-table-column__filter">
                <i class={nano.Icons.angleDown}></i>
            </div>
        );

        let component = resolveComponent('NTableFilter' + 
            Str.ucfirst(this.type));

        return [
            angleHtml, h(component, { column: this })
        ];
    },

    renderBody(props)
    {
        if ( ! this.NTable.getColumnVisiblity(this) ) {
            return null;
        }

        let uid = props.value.id + this.uid;

        let classList = [
            'n-table-cell',
            'n-table-cell--' + this.align,
            'n-table-cell--' + this.type,
        ];

        if ( this.fluid ) {
            classList.push('n-fluid');
        }

        if ( this.tempWidth ) {
            classList.push('n-fixed');
        }

        let index = this.NTable.getColumnIndex(this);

        let offset = 0;

        if ( index === 0 ) {
            offset = props.value.depth * this.NTable.itemOffset;
        }

        let style = {
            width: (this.tempWidth - offset) + 'px'
        };

        if ( this.minWidth ) {
            style.minWidth = (this.minWidth - offset) + 'px';
        }

        if ( this.maxWidth ) {
            style.maxWidth = (this.maxWidth - offset) + 'px';
        }

        let passed = Obj.except(this.$attrs, [], {
            ...props, uid: uid, class: classList, style: style, column: this
        });

        let component = resolveComponent('NTableCell' + 
            Str.ucfirst(this.type));

        return h(component, passed);
    },

    render()
    {
        return null;
    }

}