import { Hash, Obj, Locale, Str } from "@kizmann/pico-js";
import { h, resolveComponent } from "vue";

export default {

    name: 'NInfoColumn',

    inject: {

        NInfo: {
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

        previewProp: {
            default()
            {
                return 'preview';
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
            uid: Hash.uuid()
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
            <div class="n-info-column">
                <span>{this.label}</span>
            </div>
        );
    },

    renderBody(props)
    {
        let passed = Obj.except(props, [], {
            column: this
        });

        let component = resolveComponent('NInfoField' + 
            Str.ucfirst(this.type));

        if ( ! component ) {
            return null;
        }

        passed.class = [
            'n-info-field',
            'n-info-field--' + this.type
        ];

         return h(component, passed);
    },

    render()
    {
        return null;
    }

}
