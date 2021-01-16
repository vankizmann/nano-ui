import { UUID, Num, Arr, Obj, Any, Dom, Locale } from "nano-js";

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
        },

        propagation: {
            default()
            {
                return false;
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

        stopPropagation(event)
        {
            if ( this.propagation ) {
                return;
            }
            
            event.preventDefault();
            event.stopPropagation();
        },

        addItem(item)
        {
            Arr.add(this.veItems, item, {
                uid: item.uid
            });
        },

        removeItem(item)
        {
            Arr.remove(this.veItems,{
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

        Dom.find(this.$refs.form).on('submit', 
            this.stopPropagation, this._.uid);
    },

    beforeUnmount()
    {
        // let ident = {
        //     _uid: this.uid
        // };

        // if ( this.propagation ) {
        //     return;
        // }

        Dom.find(this.$refs.form).off('submit', 
            null, this._.uid);
    },

    render()
    {
        let classList = [
            'n-form',
            'n-form--' + this.align
        ];

        return (
            <form ref="form" class={classList}>
                { this.$slots.default() }
            </form>
        );
    }
}
