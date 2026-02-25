import { Arr, Dom, Mix } from "@kizmann/pico-js";

export class NDragReciever
{

    uid;

    options = {
        dragmove: null,
        dragend: null,
        dragdrop: null,
    }

    constructor(uid, options)
    {
        this.uid = uid;

        this.options = {
            ...this.options, ...options
        };

        return this;
    }

    dragmove(e, target, config)
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

        let [result, els] = [
            { uids }, { zone, item }
        ];

        if ( dragmove ) {
            result = dragmove(e, result, config, els);
        }

        if ( ! result.type ) {
            result.type = config.type;
        }

        return result;
    }

    dragdrop(e, target, config)
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

    dragend(e, result, config)
    {
        const { dragend } = this.options;

        if ( dragend ) {
            result = dragend(e, result, config);
        }

        return result;
    }

    dragstart(e, config)
    {
        NDragHandler.dragstart(e, config);
    }

    getMode(event, el, safezone = 0.5)
    {
        let [fn, mode] = [safezone, 'inside'];

        if ( typeof fn !== 'function' ) {
            fn = (v) => v * safezone;
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