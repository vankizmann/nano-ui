import { h } from "vue";
import { Arr, Dom, Locale, Mix } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.js";
import { NSelectController } from "./NSelectController.js";

/**
 * @class NSelectView
 * @extends {ProtoView}
 */
export class NSelectView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-select';

    /**
     * @type {NSelectController}
     */
    scope;

    constructor(scope)
    {
        super();

        this.scope = scope;
    }

    default()
    {
        let { scope, data } = this.scope.unpack();

        let props = {
            ref: scope.ref('el'),
            class: data.classList
        };

        return h('div', props, [
            this.display(),
            this.popover(),
            this.slot(),
        ]);
    }

    display()
    {
        return this.div('display', [
            this.clear(),
            this.angle(),
            this.single(),
            this.multis()
        ]);
    }

    single()
    {
        const { data } = this.scope.unpack();

        if ( data.multiple ) {
            return null;
        }

        return this.input();
    }

    multis()
    {
        const { data } = this.scope.unpack();

        if ( !data.multiple ) {
            return null;
        }

        return this.div('items', [
            this.tags(), this.collapse(), this.input()
        ]);
    }

    input()
    {
        let { scope, data } = this.scope.unpack();

        let props = {
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

        props.onInput = (e) => {
            data.search = e.target.value;
            scope.scrollToIndex(0);
        }

        props.onFocus = (e) => {
            scope.dom('el').child().pointerdown();
        };

        props.onKeydown = (e) => {
            if ( e.which === 9 ) Dom.find(window).pointerdown();
            if ( e.which === 13 ) scope.onEnter();
            if ( e.which === 38 ) scope.scrollToIndex(data.index - 1);
            if ( e.which === 40 ) scope.scrollToIndex(data.index + 1);
        };

        return this.div('input', [
            h('input', props)
        ]);
    }

    tags()
    {
        const { data } = this.scope.unpack();

        if ( Mix.isEmpty(data.model) ) {
            return null;
        }

        let items = Arr.clone(data.model);

        if ( data.collapse ) {
            items = Arr.slice(items, 0, 1);
        }

        return Arr.each(items, (value) => {
            return this.tag(value);
        });
    }

    tag(value)
    {
        const { data } = this.scope.unpack();

        const item = Arr.find(data.virtuals, {
            value
        });

        let props = {
            class: 'fa fa-times',
        };

        props.onClick = () => {
            data.model = value;
        };

        return this.div('item', [
            h('span', null, [item?.label || value]), h('i', props)
        ]);
    }

    collapse()
    {
        const { data } = this.scope.unpack();

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

    popover()
    {
        const { data, scope } = this.scope.unpack();

        let props = {
            width: - 1, type: scope.props.type
        };

        props.onOpen = () => {
            data.focus = 1;
            data.search = '';
            scope.focusInput();
            scope.resetDisplay();
        }

        props.onClose = () => {
            data.focus = 0;
            data.search = '';
        };

        return this.comp('n-popover', props, {
            raw: () => this.virtuals()
        });
    }

    virtuals()
    {
        const { scope, data } = this.scope.unpack();

        if ( !data.searched.length ) {
            return this.empty();
        }

        let props = {
            ref: scope.ref('scrollbar'),
            class: `${this.bem}__body`,
            items: data.searched,
        };

        props.onReady = () => {
            this.scope.ready();
        };

        const slots = {};

        slots.default = (item) => {
            return this.item(item);
        };

        return this.comp('n-virtualbar', props, slots);
    }

    item({ value, index })
    {
        const { data } = this.scope.unpack();

        let props = {
            focus: index === data.index
        };

        props.onClick = () => {
            data.index = index;
            data.model = value.value;
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