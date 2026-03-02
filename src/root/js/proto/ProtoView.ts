import { ProtoController } from "../../index.ts";
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

    default()
    {
        return null;
    }

    slot(key : string = 'default', ...args : any[])
    {
        const { slots } = this.scope.context;

        if ( slots[key] == null ) {
            return null;
        }

        return slots[key](...args);
    }

    icon(props : any = undefined)
    {
        if ( typeof props !== 'object' ) {
            props = { icon: props };
        }

        if ( Mix.isEmpty(props.icon) ) {
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

    comp(el : any, props : any = null, slot : any = null)
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

    div(props : any = 'div', slot : any = null)
    {
        const { data } = this.scope;

        if ( typeof props !== 'object' ) {
            props = { name: props };
        }

        let [name, classList] = [
            Obj.pluck(props, 'name', null),
            Obj.pluck(props, 'class', [])
        ];

        props.class = data.classPart(...[
            name, classList
        ]);

        return h('div', props, slot);
    }

    clear()
    {
        let { scope, data } = this.scope;

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
        };

        return this.div(config, [
            this.icon('fa fa-times')
        ]);
    }

    angle()
    {
        let config = {
            name: 'angle', class: ['n-form-angle']
        };

        return this.div(config, [
            this.icon('fa fa-angle-down')
        ]);
    }

    empty(options : any = {})
    {
        const props = {
            ...options
        };

        return this.div('empty', [
            this.comp('n-empty-icon', props, () => [
                this.scope.get('emptyText')
            ])
        ]);
    }

}

export default ProtoView;