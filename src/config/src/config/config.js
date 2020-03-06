import { Num, Arr, Obj, Any, Dom, Locale, Str } from "nano-js";

export default {

    name: 'NConfig',

    props: {

        value: {
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
            veValue: this.value
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
                return Obj.has({ $$value: this.veValue }, value);
            }

            return false;
        },

        solveValue(value, ...args)
        {
            if ( Any.isFunction(value) ) {
                return value.apply(this.scope, [this.veValue, ...args]);
            }

            if ( Any.isString(value) && value.match(/^\$\$scope/) ) {
                return Obj.get({ $$scope: this.scope }, value);
            }

            if ( Any.isString(value) && value.match(/^\$\$value/) ) {
                return Obj.get({ $$value: this.veValue }, value);
            }

            return value;
        },

        prepareValue(veModel)
        {
            if ( ! veModel.path ) {
                return veModel.fallback;
            }

            if ( ! Obj.has(this.veValue, veModel.path) ) {
                this.$set(this.veValue, veModel.path, veModel.fallback);
            }

            return Obj.get(this.veValue, veModel.path);
        },

        inputClosure(veModel)
        {
            if ( ! veModel.path ) {
                return () => null;
            }

            return (value) => Obj.set(this.veValue, veModel.path, value);
        }

    },

    watch: {

        value()
        {
            if ( this.value !== this.veValue ) {
                this.veValue = this.value;
            }
        }

    },

    renderLayer(source)
    {
        return Arr.each(source, (setup, component) => {

            // Set setup defaults
            setup = Obj.assign({
                vIf: true, vShow: true, vAwait: null, on: {}, props: {}, attrs: {}
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
                prop: 'value', fallback: null
            }, setup.model);

            // Delete model from setup
            delete setup.model;

            // Solve props
            Obj.map(setup.props, (value) => this.solveValue(value));

            // Solve proattrsps
            Obj.map(setup.attrs, (value) => this.solveValue(value));

            // Set prop in value or get fallback
            setup.props[veModel.prop] = this.prepareValue(veModel);

            if ( ! setup.on.input ) {
                setup.on.input = this.inputClosure(veModel);
            }

            // Solve conten if is functional
            let content = this.solveValue(setup.content, setup);

            return this.$render(component.replace(/:.*?$/, ''), setup,
                this.ctor('renderLayer')(content));
        });
    },

    render($render)
    {
        this.$render = $render;

        return this.ctor('renderLayer')(this.config)[0];
    }

}
