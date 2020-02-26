import { UUID, Num, Arr, Obj, Any, Locale } from "nano-js";

export default {

    name: 'NForm',

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

        align: {
            default()
            {
                return 'vertical';
            },
            type: [String]
        }

    },

    methods: {

        addItem(item)
        {
            Arr.add(this.items, item, {
                _uid: item._uid
            });
        },

        removeItem(item)
        {
            Arr.remove(this.items,{
                _uid: item._uid
            });
        },

        updateForm()
        {
            this.$emit('change');
        },

        updateErrors()
        {
            this.$emit('errors');
        }

    },

    data()
    {
        return {
            items: []
        }
    },

    provide()
    {
        return {
            NForm: this
        };
    },

    mounted()
    {
        this.$watch('form', this.updateForm, { deep: true });
        this.$watch('errors', this.updateErrors, { deep: true });
    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-form',
            'n-form--' + this.align
        ];

        return (
            <form class={classList} on={this.$listeners}>
                {this.$slots.default}
            </form>
        );
    }
}
