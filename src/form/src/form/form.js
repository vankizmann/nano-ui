import { UUID, Num, Arr, Obj, Any, Dom, Locale } from "@kizmann/pico-js";
import { h } from "vue";

export default {

    name: 'NForm',

    inheritAttrs: false,

    model: {
        prop: 'form'
    },

    props: {

        dom: {
            default()
            {
                return 'div';
            },
            type: [String]
        },

        form: {
            default()
            {
                return {};
            },
            type: [Object]
        },

        errors: {
            default()
            {
                return {};
            },
            type: [Object]
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

        align: {
            default()
            {
                return 'vertical';
            },
            type: [String]
        },

        prevent: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        forceChange: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        forceErrors: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

    },

    computed: {

        classList()
        {
            if ( ! this.$attrs.class ) {
                return [];
            }

            return Any.isArray(this.$attrs) ? this.$attrs.class :
                [this.$attrs.class];
        }

    },

    methods: {

        onSubmit(event)
        {
            if ( this.prevent ) {
                event.preventDefault();
                event.stopPropagation();
            }

            if ( Dom.find(event.target).is('input') ) {
                this.$emit('submit', event);
            }

            return this.prevent;
        },

        addItem(item)
        {
            Arr.add(this.elements, item, {
                uid: item.uid
            });
        },

        removeItem(item)
        {
            Arr.remove(this.elements,{
                uid: item.uid
            });
        },

        emitChange(form)
        {
            this.$emit('change');
        },

    },

    data()
    {
        return {
            uid: UUID(),
            elements: []
        };
    },

    provide()
    {
        return {
            NForm: this
        };
    },

    mounted()
    {
        Any.delay(this.ctor('ready'), 1000);
    },

    ready()
    {
        this.$watch('form', this.emitChange, { deep: true });
    },

    render()
    {
        let classList = [
            'n-form',
            'n-form--' + this.align,
        ];

        let attrs = Obj.except(this.$attrs, ['class', 'onChange', 'onSubmit'], {
            class: this.cmer(classList)
        });

        attrs['onSubmit'] = (e) => {
            return false;
        }

        return h(this.dom, { ...attrs }, [
            this.$slots.default && this.$slots.default()
        ]);
    }

}
