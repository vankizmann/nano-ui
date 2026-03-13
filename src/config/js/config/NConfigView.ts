import { h, resolveComponent } from "vue";
import { Arr, Mix, Obj } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NConfigController } from "./NConfigController.ts";

export class NConfigView extends ProtoView
{
    /**
     * @type {NConfigController}
     */
    declare scope : NConfigController;

    default() : any
    {
        const { config } = this.scope.data;

        return Arr.each(config, (value : any, key : string) => {
            return this.setup(value, key);
        });
    }

    setup(setup : any, alias : string) : any
    {
        const { scope } = this.scope;

        if ( ! Mix.isObj(setup) ) {
            return setup;
        }

        const v_if = scope.propExists(...[
            setup['vIf']
        ]);

        if ( ! v_if ) {
            return null;
        }

        const v_await = scope.propAwait(...[
            setup['vAwait']
        ]);

        if ( ! v_await ) {
            return null;
        }

        let defaults = {
            binds: {},
            props: {},
            events: {},
            content: {},
            slots: {}
        };

        let defaultsBind = {
            value: '',
            fallback: null
        };

        setup = Obj.assign(defaults, setup);

        let binds = {};

        Obj.each(setup['binds'], (value : any, key : string) => {
            binds[key] = Obj.assign(defaultsBind, {
                ...defaultsBind, ...(Mix.isStr(value) ? { value } : value)
            });
        });

        let events : any = {};

        Obj.each(setup['events'], (value : any, key : string) => {
            events[scope.toEventKey(key)] = scope.solveContext(value);
        });

        let props : any = {};

        Obj.each(setup['props'], (value : any, key : string) => {
            props[scope.toPropKey(key)] = scope.getProp(key, value);
        });

        props = Obj.assign(props, events);

        Obj.each(binds, (value : any, key : string) => {

            let updateKey = 'onUpdate:' + key;

            props[scope.toEventKey(updateKey)] = (input : any) => {
                scope.setInput(value.value, input);
            };

            props[scope.toPropKey(key)] = scope.getInput(...[
                value.value, value.fallback
            ]);
        });

        let component : any = alias.replace(/:.*?$/, '');

        if ( !Arr.has(['div', 'p', 'span'], component) ) {
            component = resolveComponent(component);
        }

        if ( Mix.isEmpty(component) ) {
            return null;
        }

        if ( !scope.propExists(setup['vShow']) ) {
            props.style = "display: none;";
        }

        let slots = {
            default: this.child(setup.content)
        };

        Obj.each(setup.slots, (slot : any, key : string) => {
            slots[key] = this.child(slot);
        });

        return h(component, props, slots);
    }

    child(callback : any)
    {
        let render = () => Arr.each(callback, (value: any, key : string) => {
            return this.setup(value, key);
        });

        if ( Mix.isFunc(callback) ) {
            render = () => callback.apply(this.scope);
        }

        if ( Mix.isStr(callback) ) {
            render = () => this.scope.getString(callback);
        }

        return render;
    }

}

export default NConfigView;