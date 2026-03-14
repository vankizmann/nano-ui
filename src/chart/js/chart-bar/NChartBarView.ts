import { h } from "vue";
import { Arr, Locale, Mix, Num } from "@kizmann/pico-js";
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
            this.header(), this.body(), this.slot('default'),
        ]);
    }

    header() : any
    {
        const { scope, data } = this.scope;

        const total = this.div('total', [
            h('span', null, data.totalLabel),
        ]);

        const avgLabel = Locale.trans(...[
            ':count avg', { count: data.avgval }
        ]);

        const avg = this.div('tag', [
            h('span', null, avgLabel),
        ])

        return this.div('header', [
            total, avg,
        ]);
    }

    body() : any
    {
        return this.div('body', [
            this.frame(), this.legend(),
        ]);
    }

    frame() : any
    {
        return this.div('frame', [
            this.avg(), this.bars(),
        ]);
    }

    avg() : any
    {
        const { scope, data } = this.scope;

        const props : any = {
            name: 'avg',
        };

        const height = Num.fixed(...[
            (100/ data.maxval) * data.avgval, 2
        ]);

        props.style = {
            '--n-chart-avg': height + '%'
        };

        return this.div(props, []);
    }

    bars() : any
    {
        let { scope, data } = this.scope;

        const items = Arr.each(data.visible, (v : any, i : number) => {
            return this.bar(v.toItem(), i);
        });

        return this.div('bars', [
            ...items, this.other(),
        ]);
    }

    other() : any
    {
        const { scope, data } = this.scope;

        if ( ! data.hidden.length ) {
            return null;
        }

        const splits = Arr.each(data.hidden, (item: any) => {
            return Num.float(item.data.value);
        });

        const item : any = {
            axis: data.otherLabel,
            value: Num.combine(splits),
            color: null,
            type: 'neutral',
        };

        return this.bar(...[
            item, data.hidden.length
        ]);
    }

    bar(item : any, index : number) : any
    {
        const { scope, data } = this.scope;

        const props : any = {
            class: ['n-chart-item']
        };

        const height = scope.getHeight(item.value);

        props.style = {
            '--n-chart-height': height + '%'
        };

        const color = Styler.wheel(...[
            item.color ?? Mix.int(data.color) + index
        ]);

        if ( ! item.type ) {
            props.class.push(`n-color-${color}`);
        } else {
            props.class.push(`n-type-${item.type}`);
        }

        const popover : any = {
            trigger: 'hover',
        };

        const value = this.comp('n-popover', popover, () => [
            h('span', item.axis),
            h('span', item.value),
        ]);

        return h('div', props, [
            this.div('bar'), value
        ]);
    }

    legend() : any
    {
        const { scope, data } = this.scope;

        if ( ! data.legend ) {
            return null;
        }

        let sorted = Arr.sort(scope.childs, 'data.value')
            .reverse();

        const items = Arr.each(sorted, (v : any, i: number) => {
            return this.item(v.toItem(), i);
        });

        const props : any = {
            class: data.classPart('legend')
        };

        return this.comp('n-scrollbar', props, () => [
            ...items,
        ])
    }

    item(item : any, index : number) : any
    {
        const { scope, data } = this.scope;

        const props : any = {
            class: ['n-chart-legend']
        };

        const color = Styler.wheel(...[
            item.color ?? Mix.int(data.color) + index
        ]);

        if ( ! item.type ) {
            props.class.push(`n-color-${color}`);
        } else {
            props.class.push(`n-type-${item.type}`);
        }

        return h('div', props, [
            h('span', null, [item.axis]),
            h('span', null, [item.value]),
        ]);
    }

}

export default NChartBarView;