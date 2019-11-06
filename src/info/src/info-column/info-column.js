import { Nano } from "nano-js";
import CtorMixin from "../../../mixins/src/ctor";

let { UUID, Num, Arr, Obj, Any, Dom, Locale, Str } = Nano;

export default {

    name: 'NInfoColumn',

    inject: {

        NInfo: {
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

        emptyText: {
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
                return this.trans('YYYY-MM-DD hh:ii');
            },
            type: [String]
        }

    },

    methods: {

        ...CtorMixin,

    },

    beforeMount()
    {
        this.NInfo.addColumn(this);
    },

    destroyed()
    {
        this.NInfo.removeColumn(this);
    },

    renderLabel({ column })
    {
        return (
            <div class="n-info-column__label">
                <span>{column.label}</span>
            </div>
        );
    },

    renderBody({ column, item, key })
    {
         return (
             <div class="n-info-column__value">
                 { this.ctor('renderCell')({ column, item, key }) }
             </div>
         );
    },

    renderCell(props)
    {
        return this.h('NInfoField' + Str.ucfirst(this.type), { props });
    },

    render(h)
    {
        this.h = h;

        if ( ! this.$scopedSlots.label ) {
            this.$scopedSlots.label = this.ctor('renderLabel');
        }

        if ( ! this.$scopedSlots.default ) {
            this.$scopedSlots.default = this.ctor('renderBody');
        }

        return null;
    }

}
