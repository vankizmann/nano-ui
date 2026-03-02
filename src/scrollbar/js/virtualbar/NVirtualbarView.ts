import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NVirtualbarController } from "./NVirtualbarController.ts";
import { Arr } from "@kizmann/pico-js";

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
        const [{ scope, data }, { start, end }] = [
            this.scope, this.scope.data.state
        ];

        let items = Arr.slice(...[
            data.items, start, end
        ]);

        let fn = () => null;

        if ( scope.context.slots.default ) {
            fn = scope.context.slots.default;
        }

        return Arr.each(items, (value : any, index : number) => {
            return this.node({ value, index: index + start }, fn);
        });
    }

    node(item : any, fn : Function)
    {
        const { data } = this.scope;

        let props : any = {
            class: [`${this.vem}__item`]
        };

        const height = data.itemHeight;

        props.style = {
            top: `${item.index * height}px`,
        };

        if ( data.rawMode ) {
            return fn({ ...item, props });
        }

        return h('div', props, [fn(item)]);
    }

}

export default NVirtualbarView;