import { Any, Arr, Obj, Str, Dom } from "nano-js";
import { h, resolveComponent } from "vue";

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
                return true;
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
                return 170;
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
                return 9999;
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
            veVisible: this.visible,
            veFluid: this.fluid,
        };
    },

    methods: {

        detectVisibity()
        {
            let visible = this.visible;

            if ( this.breakpoint ) {
                visible &= this.NTable.$el.innerWidth > this.breakpoint;
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

    },

    beforeMount()
    {
        this.NTable.addColumn(this);
    },

    beforeUnmount()
    {
        this.NTable.removeColumn(this);
    },

    renderHead()
    {
        let classList = [
            'n-table-column', 'n-' + this.align
        ];

        if ( this.NTable.veSortProp === this.prop ) {
            classList.push('is-sorted', 'is-' + this.NTable.veSortDir);
        }

        if ( this.veFluid ) {
            classList.push('n-fluid');
        }

        let filterIndex = Arr.findIndex(this.NTable.filterProps, {
            property: this.prop
        });

        if ( filterIndex !== -1 ) {
            classList.push('n-filtered');
        }

        let style = {};

        if ( this.NTable.isHidden(this) ) {
            style.display = 'none';
        }

        let props = {
            minWidth: this.minWidth,
            maxWidth: this.maxWidth,
            disabled: !! this.fixedWidth,
            group: [this.NTable.uid],
        };

        if ( this.sort ) {
            props.onClick = this.sortByColumn;
        }

        return (
            <NResizer ref="column" class={classList} style={style} vModel={this.veWidth} {...props}>
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
                <i class={this.icons.angleDown}></i>
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
        let classList = [];

        classList.push('n-' + this.align);

        if ( this.veFluid ) {
            classList.push('n-fluid');
        }

        if ( this.veWidth ) {
            classList.push('n-fixed');
        }

        let index = Arr.findIndex(this.NTable.veIntersection, this.prop);

        let offset = 0;

        if ( ! index ) {
            offset = props.value.depth * this.NTable.itemOffset;
        }

        let style = {
            width: (this.veWidth - offset) + 'px'
        };

        if ( this.minWidth ) {
            style.minWidth = (this.minWidth - offset) + 'px';
        }

        if ( this.maxWidth ) {
            style.maxWidth = (this.maxWidth - offset) + 'px';
        }

        if ( this.NTable.isHidden(this) ) {
            style.display = 'none';
        }

        let passed = Obj.except(props, [], {
            class: classList, style: style, column: this
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