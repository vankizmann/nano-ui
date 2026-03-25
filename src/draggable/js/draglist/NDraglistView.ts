import { h } from "vue";
import { Pointer, ProtoView, Styler } from "../../../root/index.ts";
import { NDraglistController } from "./NDraglistController.ts";
import { Arr, Obj } from "@kizmann/pico-js";

export class NDraglistView extends ProtoView
{
    /**
     * @type {NDraglistController}
     */
    declare scope : NDraglistController;

    /**
     * @type {string}
     */
    bem : string = 'n-draglist';

    /**
     * @type {string}
     */
    iem : string = 'n-draglist-item';

    cache = [];

    default()
    {
        let { scope, data } = this.scope;

        this.bem = data.grid ? 'n-draggrid' :
            'n-draglist';

        this.iem = data.grid ? 'n-draggrid-item' :
            'n-draglist-item';

        let props = {
            ref: scope.ref('virtualbar'),
            class: data.classList,
            items: data.visibles,
            grid: data.grid,
            itemHeight: data.itemHeight,
            itemWidth: data.itemWidth,
            scrollPortal: data.scrollPortal,
            prevent: 'keydown:[37,38,39,40]',
            dropzone: scope.uid,
        };

        const slots : any = {};

        slots.default = (node : any) => {
            return this.node(node);
        };

        return this.comp('n-virtualbar', props, slots);
    }

    header()
    {
        let props = {
            class: ['n-draglist-head']
        };

        return h('div', props, [
            this.header_handle(),
            this.header_expand(),
            this.header_select(),
        ]);
    }

    header_handle()
    {
        const { data } = this.scope;

        if ( !data.renderHandle ) {
            return null;
        }

        let props = {
            class: ['n-draglist-item__handle'],
        };

        return h('div', props);
    }

    header_expand()
    {
        const { data } = this.scope;

        if ( !data.renderExpand ) {
            return null;
        }

        let props = {
            class: ['n-draglist-item__expand'],
        };

        return h('div', props);
    }

    header_select()
    {
        const { data } = this.scope;

        if ( !data.renderSelect ) {
            return null;
        }

        let props : any= {
            class: ['n-draglist-item__checkbox']
        }

        props.onClick = (e : any) => {
            this.scope.selectAll();
        };

        let parent = {
            class: ['n-draglist-item__select'],
        };

        const state = this.scope.selectState();

        if ( state ) {
            Arr.append(parent.class, 'n-selected');
        }

        if ( ! data.items.length ) {
            Arr.append(parent.class, 'n-disabled');
        }

        let icon = Styler.icon('check');

        if ( state === 1 ) {
            icon = Styler.icon('minus');
        }

        return h('div', parent, [
            h('div', props, [
                h('i', { class: icon })
            ])
        ]);
    }

    node({ value, props })
    {
        if ( ! value ) {
            return null;
        }

        let { scope, data } = this.scope;

        props = {
            dropitem: value.uid, class: [],
        };

        if ( Arr.has(data.selected, value.uid) ) {
            Arr.append(props.class, 'n-selected');
        }

        if ( !data.renderHandle ) {
            props.draggable = !data.renderHandle;
        }

        if ( value.childs ) {
            Arr.append(props.class, 'n-children');
        }

        const uid = Obj.get(data.current, data.uniqueProp);

        if ( data.allowCurrent && uid === value.uid ) {
            Arr.append(props.class, 'n-current');
        }

        if ( Arr.has(data.expanded, value.uid) ) {
            Arr.append(props.class, 'n-expanded');
        }

        Arr.append(props.class, scope.view.iem);

        props.onClick = (e : any) => {
            scope.onCurrentclick(e, value);
            scope.emit('row-click', data.current, e);
            scope.emit('node-click', { value, item: data.current }, e);
        };

        props.onDblclick = (e : any) => {
            scope.onStopclick();
            scope.emit('row-dblclick', data.current, e);
            scope.emit('node-dblcclick', { value, item: data.current }, e);
        };

        props.onDragstart = (e : any) => {
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

    node_spacer(value : any)
    {
        if ( !value.depth ) {
            return null;
        }

        const { data } = this.scope;

        const props : any = {
            class: `${this.iem}__spacer`
        };

        props.style = {
            'width': `${value.depth * data.itemOffset}px`
        };

        return h('div', props);
    }

    node_handle(value : any)
    {
        const { scope, data } = this.scope;

        if ( !data.renderHandle ) {
            return null;
        }

        const parent = {
            class: `${this.iem}__handle`,
            draggable: true,
        };

        const props : any = {
            class: `${this.iem}__ellipsis`
        };

        props.onDragstart = (e : any) => {
            scope.nodeDragstart(e, value);
        };

        props.onClick = (e : any) => {
            e.stopPropagation();
        };

        return h('div', parent, [
            h('div', props, [
                h('i', { class: 'fa fa-ellipsis-v' })
            ])
        ]);
    }

    node_expand(value : any)
    {
        const { scope, data } = this.scope;

        if ( !data.renderExpand ) {
            return null;
        }

        const parent = {
            class: `${this.iem}__expand`
        };

        const props : any = {
            class: `${this.iem}__angle`
        };

        props.onPointerdown = (e : any) => {
            scope.onExpandclick(e, value);
        };

        props.onClick = (e : any) => {
            e.stopPropagation();
        };

        return h('div', parent, [
            h('div', props, [
                h('i', { class: 'fa fa-angle-right' })
            ])
        ]);
    }

    node_select(value : any)
    {
        const { scope, data } = this.scope;

        if ( !data.renderSelect ) {
            return null;
        }

        const parent : any = {
            class: [`${this.iem}__select`]
        };

        if ( !scope.nodeAllowSelect(value) ) {
            Arr.append(parent.class, 'n-disabled');
        }

        if ( Arr.has(data.selected, value.uid) ) {
            Arr.append(parent.class, 'n-selected');
        }

        const props : any = {
            class: [`${this.iem}__checkbox`]
        };

        props.onPointerdown = (e : any) => {
            e.preventDefault();
            scope.onSelectclick(e, value);
        };

        return h('div', parent, [
            h('div', props, [
                h('i', { class: 'fa fa-check' })
            ])
        ]);
    }

    node_element(value : any)
    {
        const { data, scope } = this.scope;

        const props = {
            class: `${this.iem}__element`
        };

        const item = Obj.get(data, value.route);

        const passed : any = {
            value, item
        };

        passed.copy = () => {
            console.log('BUILD copy');
        };

        passed.remove = () => {
            console.log('BUILD remove');
        };

        let renderNode = () => {
            return scope.context.slots.default({ value, item });
        };

        return h('div', props, [renderNode()]);
    }


}

export default NDraglistView;