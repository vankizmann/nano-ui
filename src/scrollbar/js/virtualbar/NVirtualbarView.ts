import { h, withMemo } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NVirtualbarController } from "./NVirtualbarController.ts";
import { Arr, Mix } from "@kizmann/pico-js";

export class NVirtualbarView extends ProtoView
{
    /**
     * @type {NVirtualbarController}
     */
    declare scope : NVirtualbarController;

    /**
     * @type {string}
     */
    bem : string = 'n-scrollbar';

    /**
     * @type {string}
     */
    vem : string = 'n-virtualbar';

    default()
    {
        let { scope, data } = this.scope;

        let props = {
            ref: scope.ref('el'),
            class: data.classList
        };

        return h('div', props, [
            this.content()
        ]);
    }

    content()
    {
        const { scope } = this.scope;

        let props : any = {
            ref: scope.ref('viewport'),
            class: `${this.bem}-content`,
        };

        props.onWheelPassive = () => {
            scope.startWatch();
        };

        props.onScrollPassive = () => {
            scope.startWatch();
        };

        return h('div', props, [
            this.body()
        ]);
    }

    body()
    {
        const { data } = this.scope;

        let classList = [
            data.wrapClass.replace(':bem', this.bem)
        ];

        let props = {
            class: classList
        };

        return h('div', props, [
            data.items.length ? this.wrapper() : this.empty()
        ]);
    }

    wrapper()
    {
        const { data } = this.scope;

        let props : any = {
            class: [`${this.vem}__inner`]
        };

        let total = data.items.length * data.itemHeight;

        if ( data.grid ) {
            total = (data.state.total ?? 0) * data.itemHeight
        }

        props.style = {
            'overflow-y': 'hidden', 'height': `${total}px`,
        };

        const [hkey, wkey] = [
            '--n-item-height', '--n-item-width'
        ];

        props.style = {
            ...props.style, [hkey]: `${data.itemHeight}px`
        };

        props.style = {
            ...props.style, [wkey]: `${data.itemWidth}px`
        };

        return h('div', props, [
            data.grid ? this.grid() : this.list()
        ]);
    }

    grid()
    {
        const [data, state] = [
            this.scope.data, this.scope.data.state
        ];

        if ( state.total == null ) {
            return null;
        }

        const [start, end] = [
            Math.max(1, state.start), Math.min(state.end, state.total - 1)
        ];

        const rows = Arr.chunk(...[
            data.items, state.grid
        ]);

        let items = Arr.slice(...[
            rows, start, end
        ]);

        const result = Arr.each(items, (value : any, index : number) => {
            return this.row(value, index + start);
        });

        const first = this.row(...[
            rows[0], 0
        ]);

        const last = this.row(...[
            rows[state.total - 1], state.total - 1
        ]);

        return [first, ...result, state.total > 1 && last];
    }

    row(row : any[], index : number) : any
    {
        const { scope, context, data } = this.scope;

        if ( Mix.isEmpty(row) ) {
            return null;
        }

        let fn = () => null;

        if ( context.slots.default ) {
            fn = context.slots.default;
        }

        let props : any = {
            key: scope.uid + index, class: [`${this.vem}__row`]
        };

        props.style = {
            top: `${index * data.itemHeight}px`,
        };

        const nodes = Arr.each(row, (value : any, i : number) => {
            return this.node({ value, index: i + index }, fn, true);
        });

        return h('div', props, [
            ...nodes
        ]);
    }

    list()
    {
        const [data, state] = [
            this.scope.data, this.scope.data.state
        ];

        if ( state.total == null ) {
            return null;
        }

        const [start, end] = [
            Math.max(1, state.start), Math.min(state.end, state.total - 1)
        ];

        let items = Arr.slice(...[
            data.items, start, end
        ]);

        let fn = () => null;

        if ( this.scope.context.slots.default ) {
            fn = this.scope.context.slots.default;
        }

        const result = Arr.each(items, (value : any, index : number) => {
            return this.node({ value, index: index + start }, fn);
        });

        const first = this.node(...[
            { value: data.items[0], index: 0 }, fn
        ]);

        const last = this.node(...[
            { value: data.items[state.total - 1], index: state.total - 1 }, fn
        ]);

        return [
            first, ...result, state.total > 1 && last
        ];
    }

    node(item : any, fn : Function, row : boolean = false)
    {
        const { data } = this.scope;

        if ( Mix.isEmpty(item.value) ) {
            return null;
        }

        let props : any = {
            key: this.scope.uid + item.index,
            class: [`${this.vem}__item`],
        };

        const height = data.itemHeight;

        if ( !row ) {
            props.style = { top: `${item.index * height}px` };
        }

        return h('div', props, [fn(item)]);
    }

}

export default NVirtualbarView;