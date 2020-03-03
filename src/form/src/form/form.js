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
            Arr.add(this.veItems, item, {
                _uid: item._uid
            });
        },

        removeItem(item)
        {
            Arr.remove(this.veItems,{
                _uid: item._uid
            });
        },

        updateForm()
        {
            let veForm = Obj.clone(this.form);

            if ( Any.md5(veForm) !== Any.md5(this.veForm) ) {
                this.$emit('change');
            }

            this.veForm = veForm;
        },

        updateErrors()
        {
            let veErrors = Obj.clone(this.errors);

            if ( Any.md5(veErrors) !== Any.md5(this.veErrors) ) {
                this.$emit('errors');
            }

            this.veErrors = veErrors;
        }

    },

    data()
    {
        return {
            veItems: []
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
