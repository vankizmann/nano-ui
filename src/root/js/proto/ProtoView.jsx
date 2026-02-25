import { Arr, Mix, Obj } from "@kizmann/pico-js";
import { h, resolveComponent } from "vue";

/**
 * @class ProtoView
 * @template {ProtoController} NCX
 */
export class ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-undefinded';

    /**
     * @type {NCX}
     */
    scope;

    constructor(scope)
    {
        [this.scope] = [scope];
    }

    default()
    {
        return null;
    }

    slot(key = 'default', ...args)
    {
        const { slots } = this.scope.context;

        if ( slots[key] == null ) {
            return null;
        }

        return slots[key](...args);
    }

    icon(props = undefined)
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

    comp(el, props = null, slot = null)
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

    div(props = 'div', slot = null)
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
        let { scope, data } = this.scope.unpack();

        if ( !scope.get('clearable') ) {
            return null;
        }

        let config = {
            name: 'clear', class: ['n-form-clear']
        };

        config.onClick = () => {
            data.model = Obj.clone(data.clearValue);
            data.search = '';
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

    empty(options = {})
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