import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NDraglistController } from "./NDraglistController.js";
import { Arr, Hash, Mix, Obj } from "@kizmann/pico-js";

const Dragitem = (props, { slots }) => {
    return h('div', props, slots.default());
}

/**
 * @class NDraglistView
 * @extends {BaseView<NDraglistController>}
 */
export class NDraglistView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-draglist';

    /**
     * @type {string}
     */
    iem = 'n-draglist-item';

    default()
    {
        let { scope, data } = this.scope.unpack();

        let props = {
            ref: scope.ref('virtualbar'),
            class: data.classList,
            items: data.visibles,
            prevent: 'keydown',
            rawMode: true,
            dropzone: scope.uid,
        };

        const passed = [
            'scrollPortal',
            'itemHeight',
            'itemOffset',
        ];

        Arr.each(passed, (key) => {
            props[key] = scope.props[key];
        });

        const slots = {};

        slots.default = (node) => {
            return this.node(node);
        };

        return this.comp('n-virtualbar', props, slots);
    }

    header()
    {
        let props = {
            class: ['n-draglist-head']
        };

        const state = this.scope.selectState();

        if ( state ) {
            Arr.append(props.class, 'n-selected');
        }

        return h('div', props, [
            this.header_handle(),
            this.header_expand(),
            this.header_select(),
        ]);
    }

    header_handle()
    {
        const { data } = this.scope.unpack();

        if ( ! data.renderHandle ) {
            return null;
        }

        let props = {
            class: ['n-draglist-item__handle'],
        };

        return h('div', props);
    }

    header_expand()
    {
        const { data } = this.scope.unpack();

        if ( ! data.renderExpand ) {
            return null;
        }

        let props = {
            class: ['n-draglist-item__expand'],
        };

        return h('div', props);
    }

    header_select()
    {
        const { data } = this.scope.unpack();

        if ( ! data.renderSelect ) {
            return null;
        }

        let parent = {
            class: ['n-draglist-item__select'],
        };

        let props = {
            class: ['n-draglist-item__checkbox']
        };

        props.onClick = (e) => {
            this.scope.selectAll();
        };

        let [icon, state] = [
            'fa fa-check', this.scope.selectState()
        ];

        if ( state === 1 ) {
            icon = 'fa fa-minus';
        }

        return h('div', parent, [
            h('div', props, [
                h('i', { class: icon })
            ])
        ]);
    }

    node({ value, props })
    {
        let { scope, data } = this.scope.unpack();

        props = {
            dropitem: value.uid, ...props
        };

        if ( ! data.renderHandle ) {
            props.draggable = ! data.renderHandle;
        }

        if ( value.childs ) {
            Arr.append(props.class, 'n-children');
        }

        if ( ! scope.nodeAllowSelect(value) ) {
            Arr.append(props.class, 'n-disabled');
        }

        const uid = Obj.get(data.current, data.uniqueProp);

        if ( uid === value.uid ) {
            Arr.append(props.class, 'n-current');
        }

        if ( Arr.has(data.expanded, value.uid) ) {
            Arr.append(props.class, 'n-expanded');
        }

        if ( Arr.has(data.selected, value.uid) ) {
            Arr.append(props.class, 'n-selected');
        }

        Arr.append(props.class, this.iem);

        props.onClick = () => {
            data.current = scope.getItem(value);
            scope.emit('row-click', data.current);
        };

        props.onDblclick = () => {
            scope.emit('row-dblclick', data.current);
        };

        props.onDragstart = (e) => {
            scope.nodeDragstart(e, value);
        };

        return h('div', props, [
            this.node_spacer(value),
            this.node_handle(value),
            this.node_expand(value),
            this.node_select(value),
            this.node_element(value),
        ]);
    }

    node_spacer(value)
    {
        if ( ! value.depth ) {
            return null;
        }

        const { data } = this.scope.unpack();

        const props = {
            class: `${this.iem}__spacer`
        };

        props.style = {
            'width': `${value.depth * data.itemOffset}px`
        };

        return h('div', props);
    }

    node_handle(value)
    {
        const { scope, data } = this.scope.unpack();

        if ( ! data.renderHandle ) {
            return null;
        }

        const parent = {
            class: `${this.iem}__handle`,
            draggable: true,
        };

        const props = {
            class: `${this.iem}__ellipsis`
        };

        props.onDragstart = (e) => {
            scope.nodeDragstart(e, value);
        };

        return h('div', parent, [
            h('div', props, [
                h('i', { class: 'fa fa-ellipsis-v' })
            ])
        ]);
    }

    node_expand(value)
    {
        const { data } = this.scope.unpack();

        if ( ! data.renderExpand ) {
            return null;
        }

        const parent = {
            class: `${this.iem}__expand`
        };

        const props = {
            class: `${this.iem}__angle`
        };

        props.onClick = () => {
            data.expanded = Arr.toggle(data.expanded, value.uid);
        };

        return h('div', parent, [
            h('div', props, [
                h('i', { class: 'fa fa-angle-right' })
            ])
        ]);
    }

    node_select(value)
    {
        const { data } = this.scope.unpack();

        if ( ! data.renderSelect ) {
            return null;
        }

        const parent = {
            class: `${this.iem}__select`
        };

        const props = {
            class: `${this.iem}__checkbox`
        };

        props.onClick = () => {
            data.selected = Arr.toggle(data.selected, value.uid);
        };

        return h('div', parent, [
            h('div', props, [
                h('i', { class: 'fa fa-check' })
            ])
        ]);
    }

    node_element(value)
    {
        const { data, scope } = this.scope.unpack();

        const props = {
            class: `${this.iem}__element`
        };

        const item = Obj.get(data, value.route);

        let renderNode = () => {
            return scope.context.slots.default({ value, item });
        };

        return h('div', props, [renderNode()]);
    }


}

export default NDraglistView;