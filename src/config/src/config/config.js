import { Arr, Obj, Any } from "@kizmann/pico-js";
import { h, resolveComponent } from "vue";

export default {

    name: 'NConfig',

    props: {

        modelValue: {
            default()
            {
                return {};
            },
            type: [Object]
        },

        config: {
            default()
            {
                return {};
            },
            type: [Object]
        },

        scope: {
            default()
            {
                return this;
            },
            type: [Object]
        }

    },

    data()
    {
        return {
            tempValue: this.modelValue
        };
    },

    methods: {

        solveAwait(value)
        {
            if ( Any.isEmpty(value) ) {
                return true;
            }

            if ( Any.isString(value) && value.match(/\$\$scope/) ) {
                return Obj.has({ $$scope: this.scope }, value);
            }

            if ( Any.isString(value) && value.match(/\$\$value/) ) {
                return Obj.has({ $$value: this.tempValue }, value);
            }

            return false;
        },

        solveValue(value, ...args)
        {
            if ( Any.isFunction(value) ) {
                return value.apply(this.scope, [this.tempValue, ...args]);
            }

            if ( Any.isString(value) && value.match(/^\$\$scope/) ) {
                return Obj.get({ $$scope: this.scope }, value);
            }

            if ( Any.isString(value) && value.match(/^\$\$value/) ) {
                return Obj.get({ $$value: this.tempValue }, value);
            }

            return value;
        },

        solveEvent(value)
        {
            let scope = Obj.assign(this.scope, {
                $configRefs: this.$refs
            });

            if ( Any.isFunction(value) ) {
                return (...args) => value.apply(scope, args);
            }

            return value;
        },

        solveContent(value, ...args)
        {
            if ( Any.isFunction(value) ) {
                return value.apply(this.scope, [h, this.tempValue, ...args]);
            }

            return value;
        },

        prepareValue(veModel)
        {
            if ( ! veModel.path ) {
                return veModel.fallback;
            }

            if ( ! Obj.has(this.tempValue, veModel.path) ) {
                this.deepSet(this.tempValue, veModel.path, veModel.fallback);
            }

            return Obj.get(this.tempValue, veModel.path);
        },

        inputClosure(veModel, closure = null)
        {
            if ( ! veModel.path ) {
                return () => null;
            }

            return (value) => {

                if ( closure ) {
                    closure(value, this.tempValue);
                }

                this.deepSet(this.tempValue, veModel.path, value);
            };
        },

        deepSet(obj, keys, val)
        {
            keys = (typeof keys === 'string') ?
                keys.split('.') : keys;

            let key = keys.shift();

            if ( obj[key] === undefined || obj[key] === null ) {
                Obj.set(obj, key, {});
            }

            if ( keys.length === 0 ) {
                return Obj.set(obj, key, val);
            }

            return this.deepSet(obj[key], keys, val);
        }

    },

    watch: {

        modelValue(value)
        {
            if ( value !== this.tempValue ) {
                this.tempValue = value;
            }
        }

    },

    renderLayer(source)
    {
        if ( ! Any.isPlain(source) ) {
            return [source];
        }

        return Arr.each(source, (setup, component) => {

            component = component.replace(/:.*?$/, '');

            // Set setup defaults
            setup = Obj.assign({
                vIf: true, vShow: true, vAwait: null, class: null, $on: {}, $props: {}, $attrs: {}
            }, setup);

            if ( ! this.solveAwait(setup.vAwait) ) {
                return null;
            }

            if ( ! this.solveValue(setup.vIf) ) {
                return null;
            }

            if ( ! this.solveValue(setup.vShow) ) {
                setup.style = { display: 'none' };
            }

            // Build default model
            let veModel = Obj.assign({
                prop: 'modelValue', fallback: null
            }, setup.model);

            // Delete model from setup
            delete setup.model;

            // Normalize props
            setup.$props = this.solveValue(setup.$props);

            // Normalize class
            setup.class = this.solveValue(setup.class);

            // Solve props
            Obj.map(setup.$props, (value) => this.solveValue(value));

            // Normalize attrs
            setup.$attrs = this.solveValue(setup.$attrs);

            // Solve attrs
            Obj.map(setup.$attrs, (value) => this.solveValue(value));

            // Solve events
            Obj.map(setup.$on, (value) => this.solveEvent(value));

            if ( veModel.path ) {

                // Override input event
                setup['onUpdate:modelValue'] = this.inputClosure(veModel, setup.$on.input);

                // Set prop in value or get fallback
                setup.$props[veModel.prop] = this.prepareValue(veModel);
            }

            Obj.assign(setup, setup.$props);
            delete setup.$props;

            Obj.assign(setup, setup.$attrs);
            delete setup.$attrs;

            Obj.assign(setup, setup.$on);
            delete setup.$on;
            
            let content = setup.content;
            delete setup.content;
            
            delete setup.vIf;
            delete setup.vShow;
            delete setup.vAwait;

            // Solve content if is functional
            let slots = this.solveContent(content, setup);

            let domtypes = [
                'div', 'span', 'a'
            ];

            let resolved = component;

            if ( ! Arr.has(domtypes, resolved) ) {
                resolved = resolveComponent(component);
            }

            return () => h(resolved, setup, () => {
                return Arr.each(this.ctor('renderLayer')(slots), (item) => item())
            });
        });
    },

    render()
    {
        return Arr.each(this.ctor('renderLayer')(this.config), (item) => item());
    }

}
