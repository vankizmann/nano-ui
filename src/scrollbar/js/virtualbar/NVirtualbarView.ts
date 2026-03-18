import { h, withMemo } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NVirtualbarController } from "./NVirtualbarController.ts";
import { Arr } from "@kizmann/pico-js";

const VirtualRow = () => {

};

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
            this.wrapper()
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
        const [{ data }, { start, end, grid, total }] = [
            this.scope, this.scope.data.state
        ];

        const rows = Arr.chunk(...[
            data.items, grid
        ]);

        let items = Arr.slice(...[
            rows, start, end
        ]);

        const result = Arr.each(items, (value : any, index : number) => {
            return this.row(value, index + start);
        });

        return [...result];
    }

    row(row : any[], index : number) : any
    {
        const { context, data } = this.scope;

        let fn = () => null;

        if ( context.slots.default ) {
            fn = context.slots.default;
        }

        let props : any = {
            class: [`${this.vem}__row`]
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
        const { context, data } = this.scope;

        const [start, end] = [
            Math.max(1, data.state.start), Math.min(data.state.end, data.items.length - 1)
        ];

        let items = Arr.slice(...[
            data.items, start, end
        ]);

        let fn = () => null;

        if ( context.slots.default ) {
            fn = context.slots.default;
        }

        const result = Arr.each(items, (value : any, index : number) => {
            return this.node({ value, index: index + start }, fn);
        });

        return [
            this.first(), ...result, this.last()
        ];
    }

    first() : any
    {
        const { context, data } = this.scope;

        if ( data.items.length < 1 ) {
            return null;
        }

        let fn = () => null;

        if ( context.slots.default ) {
            fn = context.slots.default;
        }

        return this.node({
            value: Arr.first(data.items), index: 0
        }, fn);
    }

    last() : any
    {
        const { context, data } = this.scope;

        if ( data.items.length < 2 ) {
            return null;
        }

        let fn = () => null;

        if ( context.slots.default ) {
            fn = context.slots.default;
        }

        return this.node({
            value: Arr.last(data.items), index: data.items.length-1
        }, fn);
    }

    node(item : any, fn : Function, row : boolean = false)
    {
        const { data } = this.scope;

        let props : any = {
            key: this.scope.uid + item.index,
            class: [`${this.vem}__item`],
            style: {}
        };

        const height = data.itemHeight;

        if ( ! row ) {
            props.style.top = `${item.index * height}px`;
        }

        return h('div', props, [fn(item)]);
    }

}

export default NVirtualbarView;