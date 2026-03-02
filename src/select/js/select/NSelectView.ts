import { h } from "vue";
import { Arr, Dom, Locale, Mix, Run } from "@kizmann/pico-js";
import { NSelectController } from "./NSelectController.ts";
import { NPopoverPanelView } from "../../../popover/js/popover-panel/NPopoverPanelView.ts";

export class NSelectView extends NPopoverPanelView
{
    /**
     * @type {NSelectController}
     */
    declare scope : NSelectController;

    /**
     * @type {string}
     */
    bem : string = 'n-select';

    /**
     * @type {any}
     */
    popoverConfig : any = {
        width: -1,
    };

    display() : any
    {
        return this.div('display', [
            this.clear(),
            this.angle(),
            this.single(),
            this.multis()
        ]);
    }

    single() : any
    {
        const { data } = this.scope;

        if ( data.multiple ) {
            return null;
        }

        return this.input();
    }

    multis() : any
    {
        const { data } = this.scope;

        if ( !data.multiple ) {
            return null;
        }

        return this.div('items', [
            this.tags(), this.collapse(), this.input()
        ]);
    }

    input() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            ref: scope.ref('input'),
            value: data.search,
            disabled: data.disabled,
            placeholder: Locale.trans(data.placeholder)
        };

        if ( !data.focus && data.label ) {
            props.value = data.label;
        }

        if ( !Mix.isEmpty(data.model) && data.label ) {
            props.placeholder = data.label;
        }

        if ( !data.focus && data.multiple ) {
            props.value = '';
        }

        if ( !Mix.isEmpty(data.model) && data.multiple ) {
            props.placeholder = '';
        }

        props.onInput = (e : any) => {
            scope.set('search', e.target.value);
            scope.scrollToIndex(0);
        }

        props.onFocus = (e : any) => {
            scope.onFocus();
        };

        props.onKeydown = (e : any) => {
            if ( e.which === 9 ) scope.onBlur();
            if ( e.which === 13 ) scope.onEnter();
            if ( e.which === 38 ) scope.scrollToIndex(data.index - 1);
            if ( e.which === 40 ) scope.scrollToIndex(data.index + 1);
        };

        return this.div('input', [
            h('input', props)
        ]);
    }

    tags() : any
    {
        const { data } = this.scope;

        if ( Mix.isEmpty(data.model) ) {
            return null;
        }

        let items = Arr.clone(data.model);

        if ( data.collapse ) {
            items = Arr.slice(items, 0, 1);
        }

        return Arr.each(items, (value : any) => {
            return this.tag(value);
        });
    }

    tag(value : any) : any
    {
        const { scope, data } = this.scope;

        const item = Arr.find(data.virtuals, {
            value
        });

        let props : any = {
            class: 'fa fa-times',
        };

        props.onClick = () => {
            scope.applyModel(value);
        };

        return this.div('item', [
            h('span', null, [item?.label || value]), h('i', props)
        ]);
    }

    collapse() : any
    {
        const { data } = this.scope;

        if ( !data.collapse || Mix.len(data.model) < 2 ) {
            return null;
        }

        const text = Locale.choice(...[
            data.collapseText, data.model.length - 1
        ]);

        return this.div('item', [
            h('span', null, [text])
        ]);

    }

    panel() : any
    {
        const { scope, data } = this.scope;

        if ( !data.searched.length ) {
            return this.empty();
        }

        let props : any = {
            ref: scope.ref('scrollbar'),
            class: `${this.bem}__body`,
            items: data.searched,
        };

        props.onReady = () => {
            this.scope.onReady();
        };

        const slots : any = {};

        slots.default = (item : any) => {
            return this.item(item);
        };

        return this.comp('n-virtualbar', props, slots);
    }

    item({ value, index }) : any
    {
        const { scope, data } = this.scope;

        let props : any = {
            focus: index === data.index
        };

        props.onClick = () => {
            scope.set('index', index);
            scope.applyModel(value.value);
        };

        props.active = Arr.has(...[
            data.model, value.value
        ]);

        if ( props.active ) {
            props.icon = 'fa fa-check';
        }

        return this.comp('n-popover-option', props, () => [
            value.label
        ]);
    }

}

export default NSelectView;