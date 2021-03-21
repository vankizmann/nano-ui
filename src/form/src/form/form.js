import { UUID, Num, Arr, Obj, Any, Dom, Locale } from "@kizmann/pico-js";

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
                event.preventDefault();
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

        setForm(form)
        {
            let veForm = Obj.clone(form);

            if ( Any.md5(veForm) !== Any.md5(this.veForm) || this.forceChange ) {
                this.$emit('change');
            }

            this.veForm = veForm;
        },

        setErrors(errors)
        {
            let veErrors = Obj.clone(errors);

            if ( Any.md5(veErrors) !== Any.md5(this.veErrors) || this.forceErrors ) {
                this.$emit('errors');
            }

            this.veErrors = veErrors;
        }

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
        // this.$watch('form', () => this.setForm(this.form),
        //     { deep: true });

        // this.$watch('errors', () => this.setErrors(this.errors),
        //     { deep: true });

        // let ident = {
        //     _uid: this.uid
        // };

        // if ( this.propagation ) {
        //     return;
        // }

        // Dom.find(this.$el).on('submit',
        //     this.onSubmit, this._.uid);
    },

    beforeUnmount()
    {
        // let ident = {
        //     _uid: this.uid
        // };

        // if ( this.propagation ) {
        //     return;
        // }

        // Dom.find(this.$el).off('submit',
        //     null, this._.uid);
    },

    render()
    {
        let classList = [
            'n-form',
            'n-form--' + this.align,
        ];

        return (
            <form method={this.method} class={classList} onSubmit={this.onSubmit}>
                { this.$slots.default && this.$slots.default() }
            </form>
        );
    }
}
