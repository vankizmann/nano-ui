import { h } from "vue";
import { Arr, Num, Obj } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NSliderController } from "./NSliderController.ts";

export class NSliderView extends ProtoView
{
    /**
     * @type {NSliderController}
     */
    declare scope : NSliderController;

    /**
     * @type {string}
     */
    bem : string = 'n-slider';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            ref: scope.ref('el'),
            class: data.classList,
        };

        return h('div', props, [
            this.bar(), this.handles()
        ]);
    }

    bar() : any
    {
        let { scope, data } = this.scope;

        const width = (data.width || 0) / data.minmax *
            Num.subtract([
                data.values[1], data.values[0]
            ]);

        const offset = (data.width || 0) / data.minmax *
            Num.subtract([
                data.values[0], data.minfix
            ]);

        let props : any = {
            name: 'range'
        };

        props.style = {
            width: Num.fixed(width || 0, 2) + 'px',
            left: Num.fixed(offset || 0, 2) + 'px',
        };

        return this.div('bar', [
            this.div(props)
        ]);
    }

    handles() : any
    {
        let { data } = this.scope;

        const vals = Arr.slice(data.values, ...[
            data.range ? 0 : 1, data.values.length
        ]);

        return Arr.each(vals, (value : any, index : any) => {
            return this.handle(value, data.range ? index : 1);
        });
    }

    handle(value : any, index : any) : any
    {
        let { scope, data } = this.scope;

        const offset = (data.width || 0) / data.minmax *
            Num.subtract([
                value, data.minfix
            ]);

        let props : any = {
            name: 'handle', 'data-handle': index,
        };

        props.style = {
            left: Num.fixed(offset, 2) + 'px',
        };

        props.onPointerdown = (e : any) => {
            scope.onPointerdown(e, index);
        };

        let key = Arr.findIndex(...[
            data.steps, value
        ]);

        props['data-tooltip'] = Obj.get(...[
            data.labels, key, value
        ]);

        return this.div(props, [h('span')]);
    }

}

export default NSliderView;