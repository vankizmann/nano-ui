import { UUID, Num, Obj, Any, Locale } from "nano-js";

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
            this.items.push(item);
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

    render(h)
    {
        return (
            <form class={['n-form', 'n-form--' + this.align]} on={this.$listeners}>
                {this.$slots.default}
            </form>
        );
    }
}
