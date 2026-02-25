import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NVirtualbarController } from "./NVirtualbarController.js";
import { Arr, Mix, Run } from "@kizmann/pico-js";

/**
 * @class NVirtualbarView
 * @extends {BaseView<NVirtualbarController>}
 */
export class NVirtualbarView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-scrollbar';

    /**
     * @type {string}
     */
    vem = 'n-virtualscroller';

    default()
    {
        let { scope, data } = this.scope.unpack();

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
        const { scope } = this.scope.unpack();

        let props = {
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
        const { data } = this.scope.unpack();

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
        const { data } = this.scope.unpack();

        let props = {
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
            this.scope.unpack(), this.scope.data.state
        ];

        let items = Arr.slice(...[
            data.items, start, end
        ]);

        let fn = () => null;

        if ( scope.context.slots.default ) {
            fn = scope.context.slots.default;
        }

        return Arr.each(items, (value, index) => {
            return this.node({ value, index: index + start }, fn);
        });
    }

    node(item, fn)
    {
        const { scope, data } = this.scope.unpack();

        let props = {
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