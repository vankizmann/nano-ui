import { h } from "vue";
import { Arr, Locale, Mix, Num } from "@kizmann/pico-js";
import { ProtoView, Styler } from "../../../root/index.ts";
import { NChartDonutController } from "./NChartDonutController.ts";

export class NChartDonutView extends ProtoView
{
    /**
     * @type {NChartDonutController}
     */
    declare scope : NChartDonutController;

    /**
     * @type {string}
     */
    bem : string = 'n-chart-donut';

    /**
     * @type {number}
     */
    last : number = 0;

    /**
     * @type {any}
     */
    attrs: any = {
        'cx': '70', 'cy': '70', 'r': '57.2958'
    };

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList,
        };

        if ( data.overlap ) {
            props.class.push(`${this.bem}--overlap`);
        }

        props.style = {
            '--n-chart-label': `'${data.totalLabel}'`,
            '--n-chart-value': Num.int(data.total),
            '--n-stroke-width': Num.int(data.width),
        };

        return h('div', props, [
            this.chart(), this.legend(), this.slot('default'),
        ]);
    }

    chart() : any
    {
        return this.div('chart', [
            this.svg(), this.text()
        ]);
    }

    svg() : any
    {
        const { scope, data } = this.scope;

        const props : any = {
            width: 600,
            height: 600,
            viewBox: '0 0 140 140',
        };

        this.last = 0;

        const items = Arr.each(data.visible, (v : any, i : number) => {
            return this.circle(v.toItem(), i);
        });

        const base = h('circle', {
            class: `${this.bem}__base`, ...this.attrs,
        });

        return h('svg', props, [
            base, ...items, this.other(),
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
            type: 'neutral'
        };

        return this.circle(...[
            item, data.visible.length
        ]);
    }

    circle(item : any, index : number) : any
    {
        const { scope, data } = this.scope;

        let [offset, distance] = [
            this.last * - 1, scope.getDistance(item.value)
        ];

        if ( !data.overlap ) {
            offset = Math.min(offset - (data.width * 0.5), 0);
        }

        let dasharr = distance;

        if ( !data.overlap ) {
            dasharr = Math.max(dasharr - (data.width * 1.5), 0);
        }

        this.last = distance + this.last;

        const props : any = {
            class: ['n-chart-item'], ...this.attrs,
        };

        const color = Styler.wheel(...[
            item.color ?? Mix.int(data.color) + index
        ]);

        if ( ! item.type ) {
            props.class.push(`n-color-${color}`);
        } else {
            props.class.push(`n-type-${item.type}`);
        }

        props.style = {
            'stroke-dashoffset': Num.fixed(offset, 4),
            'stroke-dasharray': Num.fixed(dasharr, 4) + ' 360'
        };

        props.onPointerenter = () => {
            scope.onPointerenter(item);
        };

        props.onPointerleave = () => {
            scope.onPointerleave(item);
        };

        return h('g', { class: 'n-chart-group' }, [
            h('circle', props),
        ]);
    }

    text() : any
    {
        const { scope } = this.scope;

        const props : any = {
            ref: scope.ref('text'),
            name: 'text',
        };

        return this.div(props, [
            h('span', null, null),
            h('span', null, null),
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

export default NChartDonutView;