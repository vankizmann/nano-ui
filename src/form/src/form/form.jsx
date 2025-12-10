import { UUID, Num, Arr, Obj, Any, Dom, Locale } from "@kizmann/pico-js";
import { h } from "vue";
import {FormMessage, FormRules} from "./form-rules.mjs";

export default {

    name: 'NForm',

    inheritAttrs: false,

    model: {
        prop: 'form'
    },

    props: {

        ready: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

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

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        },

        kind: {
            default()
            {
                return 'classic';
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

        ignore: {
            default()
            {
                return ['modified', 'dragid'];
            },
            type: [Array]
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

    data()
    {
        return {
            uid: UUID(), elements: [], rules: [], groups: {}, ruleErrors: {}, blocked: true,
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
        Any.delay(this.ctor('ready'), 500);
    },

    ready()
    {
        this.$watch('form', this.emitChange, {
            deep: true
        });

        this.resetChange();
    },

    methods: {

        getGroups()
        {
            return this.groups;
        },

        appendGroup(group)
        {
            this.groups[group.uid] = group;
        },

        removeGroup(group)
        {
            delete this.groups[group.uid];
        },

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

        appendItem(item)
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

        resetChange(timeout = 500)
        {
            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                this.blocked = false;
            }, timeout);

            this.blocked = true;

            let value = Obj.except(this.form,
                this.ignore);

            this.prevState = JSON.stringify(value);
        },

        emitChange()
        {
            if ( this.blocked ) {
                return;
            }

            let value = Obj.except(this.form,
                this.ignore);

            let nextState = JSON.stringify(value);

            if ( this.prevState == nextState ) {
                return;
            }

            this.validate();

            this.prevState = nextState;

            this.$emit('change');
        },

        validateField(field)
        {
            let errors = [];

            Arr.each(field.rules, (rule) => {
                let [name, ...args] = rule.split(':');

                if ( ! FormRules[name] || !FormMessage[name] ) {
                    return;
                }

                let value = Obj.get(this.form, field.prop);

                if ( FormRules[name].call(this, field, value, ...args) ) {
                    return;
                }

                let message = FormMessage[name].call(this, field, value, ...args);

                if ( Any.isEmpty(message) ) {
                    return;
                }

                errors.push(message);
            });

            return errors;
        },

        validate()
        {
            let errors = {};

            Arr.each(this.elements, (field) => {
                errors[field.prop] = this.validateField(field);
            });

            this.ruleErrors = Obj.filter(errors, (err) => {
                return ! Any.isEmpty(err);
            });

            return this.ruleErrors;
        },

        isValid(includeErrors = false)
        {
            let count = Any.keys(this.ruleErrors).length;

            if ( includeErrors ) {
                count += Any.keys(this.errors).length;
            }

            return count === 0;
        },

        getErrors()
        {
            let errors = {};

            Obj.each(this.errors, (err, key) => {

                if ( ! Any.isArray(err) ) {
                    err = [err];
                }

                errors[key] = err;
            });

            Obj.each(this.ruleErrors, (err, key) => {

                if ( Obj.has(errors, key) ) {
                    err = Arr.merge(errors[key], err);
                }

                errors[key] = err;
            });

            return errors;
        },

    },

    render()
    {
        let classList = [
            'n-form',
            'n-form--' + this.size,
            'n-form--' + this.type,
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
