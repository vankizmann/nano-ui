import { ProtoController, Styler } from "../../index.ts";
import { Mix } from "@kizmann/pico-js";
import { Obj } from "@kizmann/pico-js";
import { h } from "vue";
import { resolveComponent } from "vue";

export class ProtoView
{
    /**
     * @type {ProtoController}
     */
    scope : ProtoController;

    /**
     * @type {string}
     */
    declare bem : string;

    constructor(scope : ProtoController)
    {
        this.scope = scope;
    }

    default() : any
    {
        return null;
    }

    slot(key : string = 'default', ...args : any[]) : any
    {
        const { slots } = this.scope.context;

        if ( slots[key] == null ) {
            return null;
        }

        return slots[key](...args);
    }

    icon(props : any = undefined) : any
    {
        if ( ! Mix.isObj(props) ) {
            props = { icon: props };
        }

        if ( !props.icon ) {
            return null;
        }

        const [icon, classList] = [
            Obj.pluck(props, 'icon', ''),
            Obj.pluck(props, 'class', [])
        ];

        props.class = [
            `n-icon ${icon}`, ...classList
        ].join(' ');

        return h('i', props);
    }

    comp(el : any, props : any = null, slot : any = null) : any
    {
        let component = null;

        try {
            component = resolveComponent(el);
        } catch (e) {
            console.error(`Failed to resolve component: ${el}`);
        }

        if ( component == null ) {
            return null;
        }

        return h(component, props, slot);
    }

    div(props : any = 'div', slot : any = null, type : string = 'div') : any
    {
        const { data } = this.scope;

        if ( ! Mix.isObj(props) ) {
            props = { name: props };
        }

        let [name, classList] = [
            Obj.pluck(props, 'name', null),
            Obj.pluck(props, 'class', [])
        ];

        props.class = data.classPart(...[
            name, classList
        ]);

        return h(type, props, slot);
    }

    clear(value : any = true) : any
    {
        let { scope, data } = this.scope;

        if ( Mix.isEmpty(value) ) {
            return null;
        }

        if ( !scope.get('clearable') ) {
            return null;
        }

        let config : any = {
            name: 'clear', class: ['n-form-clear']
        };

        config.onClick = () => {
            scope.applyClear();
            scope.set('search', '');
            scope.ref('input')?.value?.focus();
            scope.emit('clear');
        };

        return this.div(config, [
            this.icon(Styler.icon('times'))
        ]);
    }

    angle() : any
    {
        let config = {
            name: 'angle', class: ['n-form-angle']
        };

        return this.div(config, [
            this.icon(Styler.icon('angle-down'))
        ]);
    }

    empty(options : any = {}) : any
    {
        const { scope } = this.scope;

        let props : any = scope.get('emptyProps') || {};

        props = {
            ...props, ...options, emptyText: scope.get('emptyText')
        };

        return this.div('empty', [
            this.comp('n-empty-icon', props)
        ]);
    }

}

export default ProtoView;