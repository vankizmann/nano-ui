import { UUID, Num, Arr, Obj, Any, Dom, Locale, Str } from "nano-js";
import { h, resolveComponent } from "vue";

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
                return Locale.trans('-');
            },
            type: [String]
        },

        trueText: {
            default()
            {
                return Locale.trans('Yes');
            },
            type: [String]
        },

        falseText: {
            default()
            {
                return Locale.trans('No');
            },
            type: [String]
        },

        datetimeFormat: {
            default()
            {
                return Locale.trans('YYYY-MM-DD HH:mm');
            },
            type: [String]
        }

    },

    data()
    {
        return {
            uid: UUID()
        };
    },

    beforeMount()
    {
        this.NInfo.addColumn(this);
    },

    beforeUnmount()
    {
        this.NInfo.removeColumn(this);
    },

    renderLabel()
    {
        if ( this.$slots.label ) {
            return this.$slots.label();
        }
        
        return (
            <div class="n-info-column__label">
                <span>{this.label}</span>
            </div>
        );
    },

    renderBody(props)
    {
        if ( this.$slots.default ) {
            return this.$slots.label();
        }

        let passed = Obj.except(props, [], {
            column: this
        });


        let component = resolveComponent('NInfoField' + 
            Str.ucfirst(this.type));

         return (
             <div class="n-info-column__value">
                 { h(component, passed) }
             </div>
         );
    },

    renderCell(props)
    {
    },

    render()
    {
        return null;
    }

}
