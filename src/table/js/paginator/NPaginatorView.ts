import { h } from "vue";
import { Arr, Locale, Mix, Str } from "@kizmann/pico-js";
import { ProtoView, Styler } from "../../../root/index.ts";
import { NPaginatorController } from "./NPaginatorController.ts";

export class NPaginatorView extends ProtoView
{
    /**
     * @type {NPaginatorController}
     */
    declare scope : NPaginatorController;

    /**
     * @type {string}
     */
    bem : string = 'n-paginator';

    resolve(key : string) : any
    {
        const func = Str.sc(`slot_${key}`);

        if ( this[func] ) {
            return this[func]();
        }

        return this.slot_custom(key);
    }

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList,
            disabled: data.disabled,
        };

        const slots = Arr.each(data.layout, (key : string) => {
            return this.resolve(key);
        });

        return h('div', props, slots);
    }

    slot_spacer() : any
    {
        return this.div('spacer', null);
    }

    slot_custom(key : string) : any
    {
        const { context } = this.scope;

        if ( !context.slots[key] ) {
            return null;
        }

        return this.div('pages', [
            this.slot(key)
        ]);
    }

    slot_limit() : any
    {
        const { scope, data } = this.scope;

        const fn = (value : number) => {
            return Locale.choice(data.limitText, value);
        };

        const options = Arr.each(data.limitOptions, (value : number) => {
            return { value, label: fn(value) };
        });

        let props : any = {
            modelValue: data.limit,
            options: options,
            optionsValue: '$value.value',
            optionsLabel: '$value.label',
        };

        props['onUpdate:modelValue'] = (value : number) => {
            scope.update('limit', value);
        };

        return this.div('limit', [
            this.comp('n-select', props)
        ]);
    }

    slot_count() : any
    {
        const { data } = this.scope;

        return this.div('count', [
            Locale.choice(data.countText, data.total)
        ]);
    }

    slot_goto() : any
    {
        const { scope, data } = this.scope;

        let props : any = {
            modelValue: data.page,
            options: data.pageOptions,
            undefinedText: '?',
            emptyText: null,
            optionsValue: '$value',
            optionsLabel: '$value',
        };

        props['onUpdate:modelValue'] = (value : number) => {
            scope.update('page', value);
        };

        return this.div('goto', [
            this.comp('n-select', props),
        ]);
    }

    slot_pages() : any
    {
        const { data } = this.scope;

        const [page, pages]: [number, number] = [
            data.page || 1, Math.abs(data.maxPages / 2)
        ];

        let [min, max]: [number, number] = [
            Math.floor(page - pages), Math.ceil(page + pages)
        ];

        if ( min < 1 ) {
            (max -= min, min = 0);
        }

        const len = data.pageOptions.length + 1;

        if ( max > len ) {
            (min -= (max - len), max = len);
        }

        if ( max - min > 0 ) {
            max -= 1;
        }

        let items = Arr.slice(data.pageOptions, ...[
            min, max
        ]);

        let slots = Arr.each(items, (value : number) => {
            return this.page(value);
        });

        Arr.prepend(slots, ...[
            this.page(1, 'prev-first'),
            this.page(data.page - 1, 'prev'),
        ]);

        Arr.append(slots, ...[
            this.page(data.page + 1, 'next'),
            this.page(len - 1, 'next-last'),
        ]);

        return this.div('pages', slots);
    }

    page(index: number, icon : string = null) : any
    {
        const { scope, data } = this.scope;

        let props : any = {
            ...(data.buttonProps || {})
        };

        if ( ! Mix.isEmpty(icon) ) {
            props.square = true;
        }

        if ( index === data.page ) {
            props.disabled = true;
        }

        props['onPointerdown'] = () => {
            scope.update('page', index);
        }

        if ( index < 1 ) {
            props.disabled = true;
        }

        const len = data.pageOptions.length;

        if ( index > len ) {
            props.disabled = true;
        }

        if ( icon ) {
            props.icon = Styler.icon(icon);
        }

        return this.comp('n-button', props, ...[
            () => icon ? null : index
        ]);
    }

}

export default NPaginatorView;