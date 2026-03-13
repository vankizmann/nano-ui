import { h } from "vue";
import { Arr, Mix, Num } from "@kizmann/pico-js";
import { ProtoView, Styler } from "../../../root/index.ts";
import { NChartBarController } from "./NChartBarController.ts";

export class NChartBarView extends ProtoView
{
    /**
     * @type {NChartBarController}
     */
    declare scope : NChartBarController;

    /**
     * @type {string}
     */
    bem : string = 'n-chart-bar';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList,
        };

        return h('div', props, [
            this.bars(), this.slot('default'),
        ]);
    }

    bars() : any
    {
        let { scope, data } = this.scope;

        let els = scope.childs;

        const sorted = Arr.sort(...[
            els, 'data.value'
        ]).reverse();

        if ( data.sort ) {
            els = Arr.clone(sorted);
        }

        const temp = Arr.splice(...[
            sorted, 0, data.limit ?? els.length
        ]);

        let visible = Arr.filter(els, (el : any) => {
            return Arr.find(temp, { uid: el.uid }) != null;
        });

        let hidden = Arr.filter(els, (el : any) => {
            return Arr.find(temp, { uid: el.uid }) == null;
        });

        const items = Arr.each(visible, (v : any, i : number) => {
            return this.item(v, i);
        });

        return this.div('bars', [
            ...items, this.other(hidden, visible),
        ]);
    }

    item(item : any, index : number) : any
    {
        const { scope, data } = this.scope;

        const props : any = {
            class: ['n-chart-item']
        };

        const height = scope.getHeight(item.data.value);

        props.style = {
            '--n-chart-height': height + '%'
        };

        const color = Styler.wheel(...[
            item.data.color ?? Mix.int(data.color) + index
        ]);

        if ( ! item.data.type ) {
            props.class.push(`n-color-${color}`);
        }

        const value = this.div('value', [
            h('span', item.data.axis),
            h('span', item.data.value),
        ]);

        return h('div', props, [
            this.div('bar'), this.div('dot'), value
        ]);
    }

    other(hidden : any, visible : any) : any
    {
        const { scope, data } = this.scope;

        if ( ! hidden.length ) {
            return null;
        }

        const splits = Arr.each(hidden, (item: any) => {
            return Num.float(item.data.value);
        });

        const total = Num.combine(splits);

        const props : any = {
            class: ['n-chart-item', 'n-chart-item--other']
        };

        const height = scope.getHeight(total);

        props.style = {
            '--n-chart-height': height + '%'
        };

        const value = this.div('value', [
            h('span', data.otherLabel),
            h('span', total),
        ]);

        return h('div', props, [
            this.div('bar'), this.div('dot'), value
        ]);
    }

}

export default NChartBarView;