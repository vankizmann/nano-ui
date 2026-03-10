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
    vem : string = 'n-virtualscroller';

    cache = new Map();

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

        const total = data.items.length * data.itemHeight;

        props.style = {
            'overflow-y': 'hidden', 'height': `${total}px`,
        };

        const [hkey, wkey] = [
            '--n-item-height', '--n-item-width'
        ]

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
        return null;
    }

    list()
    {
        const [{ context, data }, { start, end }] = [
            this.scope, this.scope.data.state
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

        let fn = () => null;

        if ( context.slots.default ) {
            fn = context.slots.default;
        }

        if ( data.state.start === 0 ) {
            return null;
        }

        return this.node({
            value: Arr.first(data.items), index: 0
        }, fn);
    }

    last() : any
    {
        const { context, data } = this.scope;

        let fn = () => null;

        if ( context.slots.default ) {
            fn = context.slots.default;
        }

        const len = data.items.length;

        if ( data.state.end === len ) {
            return null;
        }

        return this.node({
            value: Arr.last(data.items), index: len
        }, fn);
    }

    node(item : any, fn : Function)
    {
        const { data } = this.scope;

        let props : any = {
            key: this.scope.uid + item.index,
            class: [`${this.vem}__item`]
        };

        const height = data.itemHeight;

        props.style = {
           top: `${item.index * height}px`,
        };

        // if ( data.rawMode ) {
        //     return fn({ ...item, props });
        // }

        return h('div', props, [fn(item)]);
    }

}

export default NVirtualbarView;