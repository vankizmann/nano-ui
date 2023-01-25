import { UUID, Num, Arr, Obj, Any, Dom, Locale } from "@kizmann/pico-js";

export default {

    name: 'NForm',

    inheritAttrs: false,

    model: {
        prop: 'form'
    },

    props: {

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

    methods: {

        onSubmit(event)
        {
            if ( this.prevent ) {
                event.stopPropagation();
            }

            this.$emit('submit', event);

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

        let attrs = Obj.except(this.$attrs, [
            'onChange', 'onSubmit'
        ]);


        return (
            <form class={classList} onSubmit={this.onSubmit} {...attrs}>
                { this.$slots.default && this.$slots.default() }
            </form>
        );
    }
}
