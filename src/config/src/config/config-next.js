import { Arr, Obj, Str, Any } from "@kizmann/pico-js";
import { h, resolveComponent } from "vue";

export default {

    name: 'NConfigNext',

    props: {

        modelValue: {
            default()
            {
                return {};
            },
            type: [Object]
        },

        extraValue: {
            default()
            {
                return null;
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
                return {};
            },
            type: [Object]
        }

    },

    data()
    {
        return {
            tempValue: this.modelValue, sempValue: this.extraValue || this.modelValue
        };
    },

    watch: {

        modelValue: function (value) {
            if ( value !== this.tempValue ) {
                this.tempValue = value;
            }
        },

        extraValue: function (value) {
            if ( value !== this.sempValue ) {
                this.sempValue = value;
            }
        }

    },

    methods: {

        getString(value)
        {
            let final = value.replace(/^@/, '')
                .replace(/^\\@/, '@');



            if ( value.match(/^@/) ) {
                return this.trans(final);
            }

            return final;
        },

        propAwait(value)
        {
            if ( Any.isEmpty(value) ) {
                return true;
            }

            if ( ! Any.isArray(value) ) {
                value = [value];
            }

            let result = Arr.each(value, (state) => {
                return this.getState(state, true);
            });

            return ! Arr.has(result, false);
        },

        propExists(value)
        {
            if ( Any.isEmpty(value) ) {
                return true;
            }

            if ( ! Any.isArray(value) ) {
                value = [value];
            }

            let result = Arr.each(value, (state) => {
                return this.getState(state, false);
            });

            return ! Arr.has(result, false);
        },

        getState(value, exists = true)
        {
            if ( Any.isFunction(value) ) {
                return !! this.solveInput(value);
            }

            if ( ! Any.isString(value) ) {
                return !! value;
            }

            if ( ! value.match(/(\$scope|\$model|\$global)/) ) {
                return !! value;
            }

            let sources = {
                $scope: this.scope, $model: this.tempValue, $extra: this.sempValue, $global: window
            };

            if ( exists ) {
                return Obj.get(sources, value, undefined) === undefined;
            }

            return !! Obj.get(sources, value);
        },

        toPropKey(value)
        {
            let splits = value.replace(/^!/, '').split('-');

            value = Arr.each(splits, (split) => {
                return Str.ucfirst(split);
            });

            return Str.lcfirst(value.join(''));
        },

        toEventKey(value)
        {
            if ( ! value.match(/^on/) ) {
                value = 'on-' + value;
            }

            let splits = value.split('-');

            value = Arr.each(splits, (split) => {
                return Str.ucfirst(split);
            });

            return Str.lcfirst(value.join(''));
        },

        solveInput(cb, fallback)
        {
            return cb.call(this.scope, this.tempValue, fallback);
        },

        solveContext(cb)
        {
            if ( ! Any.isFunction(cb) ) {
                return () => console.error('Raw suffix (!) only allowed on functions');
            }

            return (...args) => cb.call(this.scope, ...args);
        },

        getProp(key, value)
        {
            if ( key.match(/^!/) ) {
                return this.solveContext(value);
            }

            if ( Any.isFunction(value) ) {
                return this.solveInput(value);
            }

            if ( ! Any.isString(value) ) {
                return value;
            }

            if ( ! value.match(/(\$scope|\$model|\$global)/) ) {
                return this.getString(value);
            }

            let sources = {
                $scope: this.scope, $model: this.tempValue, $extra: this.sempValue, $global: window
            };

            let result = Obj.get(sources, value.replace(/^!+/, ''));

            if ( value.match(/^!!\$/) ) {
                result = Any.isEmpty(result);
            }

            if ( value.match(/^!\$/) ) {
                result = Any.isEmpty(result);
            }

            return result;
        },

        getInput(prop, fallback)
        {
            if ( Any.isFunction(prop) ) {
                return this.solveInput(prop, fallback);
            }

            let sources = {
                $scope: this.scope, $model: this.tempValue, $extra: this.sempValue, $global: window
            };

            if ( ! Any.isNull(fallback) && Obj.get(sources, prop, -1337) === -1337 ) {
                Obj.set(sources, prop, fallback);
            }

            return Obj.get(sources, prop);
        },

        setInput(prop, value)
        {
            if ( Any.isFunction(prop) ) {
                return console.error('NConfigNew: Bind with function is not allowed!');
            }

            let sources = {
                $scope: this.scope, $model: this.tempValue, $extra: this.sempValue, $global: window
            };

            Obj.set(sources, prop, value);
        }

    },

    renderSetup(setup, alias)
    {
        if ( ! Any.isPlain(setup) ) {
            return setup;
        }

        if ( ! this.propExists(setup['vIf']) ) {
            return null;
        }

        if ( ! this.propAwait(setup['vAwait']) ) {
            return null;
        }

        let defaults = {
            binds: {}, props: {}, events: {}, content: {}
        };

        let defaultsBind = {
            value: '', fallback: null
        };

        setup = Obj.assign(defaults, setup);

        let binds = {};

        Obj.each(setup['binds'], (value, key) => {

            if ( Any.isString(value) ) {
                value = { value: value };
            }

            binds[key] = Obj.assign(defaultsBind, value);
        });

        let events = {};

        Obj.each(setup['events'], (value, key) => {
            events[this.toEventKey(key)] = this.solveContext(value);
        });

        let props = {};

        Obj.each(setup['props'], (value, key) => {
            props[this.toPropKey(key)] = this.getProp(key, value);
        });

        props = Obj.assign(props, events);

        Obj.each(binds, (value, key) => {

            let updateKey = 'onUpdate:' + key;

            props[this.toEventKey(updateKey)] = (input) => {
                this.setInput(value.value, input);
            };

            props[this.toPropKey(key)] = this.getInput(value.value,
                value.fallback);
        });

        let component = alias.replace(/:.*?$/, '');

        if ( !Arr.has(['div', 'p'], component) ) {
            component = resolveComponent(component);
        }

        if ( Any.isEmpty(component) ) {
            return null;
        }

        if ( !this.propExists(setup['vShow']) ) {
            props.style = "display: none;";
        }

        let render = () => Arr.each(setup.content, (value, key) => {
            return this.ctor('renderSetup')(value, key);
        });

        if ( Any.isFunction(setup.content) ) {
            render = () => setup.content.apply(this.scope);
        }

        if ( Any.isString(setup.content) ) {
            render = () => this.getString(setup.content);
        }

        return h(component, props, { default: render });
    },

    render()
    {
        return Arr.each(this.config, (value, key) => this.ctor('renderSetup')(value, key));
    }

}