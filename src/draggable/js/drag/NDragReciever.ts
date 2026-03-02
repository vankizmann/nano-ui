import { Arr, Dom, Mix } from "@kizmann/pico-js";
import NDragHandler from "./NDragHandler.ts";

export class NDragReciever
{
    /**
     * @type {string}
     */
    uid : string;

    /**
     * @type {any}
     */
    options : any = {
        dragmove: null,
        dragend: null,
        dragdrop: null,
    }

    constructor(uid : string, options : any)
    {
        this.uid = uid;

        this.options = {
            ...this.options, ...options
        };

        return this;
    }

    dragmove(e : any, target : HTMLElement, config : any)
    {
        const { dragmove } = this.options;

        const [zone, item] = [
            target.closest('[dropzone]'),
            target.closest('[dropitem]'),
        ];

        const uids = {
            zone: zone?.getAttribute('dropzone'),
            item: item?.getAttribute('dropitem'),
        };

        let [result, els] : [any, any] = [
            { uids }, { zone, item }
        ];

        if ( dragmove ) {
            result = dragmove(e, result, config, els);
        }

        if ( !result.type ) {
            result.type = config.type;
        }

        return result;
    }

    dragdrop(e : any, target : HTMLElement, config : any)
    {
        let result = this.dragmove(e, target, config);

        if ( Arr.has(['deny', 'self'], result.mode) ) {
            return result;
        }

        const { dragdrop } = this.options;

        if ( dragdrop ) {
            result = dragdrop(e, result, config);
        }

        return result;
    }

    dragend(e : any, result : any, config : any)
    {
        const { dragend } = this.options;

        if ( dragend ) {
            result = dragend(e, result, config);
        }

        return result;
    }

    dragstart(e : any, config : any)
    {
        NDragHandler.dragstart(e, config);
    }

    getMode(event : any, el : HTMLElement, safezone : Function | number = 0.5)
    {
        let [fn, mode] = [safezone, 'inside'];

        if ( typeof fn !== 'function' ) {
            // @ts-ignore
            fn = (v : number) => v * safezone;
        }

        const [padding, rect] = [
            fn(el.clientHeight), Dom.find(el).rect()
        ];

        if ( event.clientY < rect.y + padding ) {
            mode = 'before';
        }

        if ( event.clientY > rect.y + rect.height - padding ) {
            mode = 'after';
        }

        if ( Dom.find(el).hasClass('n-expanded') ) {
            mode = mode === 'after' ? 'inside' : mode;
        }

        return mode;
    }

}

export default NDragReciever;