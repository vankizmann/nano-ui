import { h } from "vue";
import { Arr, Dom, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NCascaderController } from "./NCascaderController.ts";
import { NPopoverPanelView } from "../../../popover/js/popover-panel/NPopoverPanelView.ts";
import { NCascaderPanelProps } from "../cascader-panel/NCascaderPanel.ts";

export class NCascaderView extends NPopoverPanelView
{
    /**
     * @type {NCascaderController}
     */
    declare scope : NCascaderController;

    /**
     * @type {string}
     */
    bem : string = 'n-cascader';

    display() : any
    {
        return this.div('display', [
            this.items(),
            this.clear(),
            this.angle(),
        ]);
    }

    items() : any
    {
        const { data } = this.scope;

        if ( Mix.isEmpty(data.model) ) {
            return this.placeholder();
        }

        let items = data.virtuals;

        if ( Mix.isEmpty(items) ) {
            items = data.model;
        }

        const first = Arr.first(items);

        let [offset, compare] = [
            Mix.len(items) - data.collapse,
            Mix.len(items) - data.collapse,
        ];

        if ( ! data.collapseFirst && offset > 0  ) {
            offset = offset + 1;
        }

        let result = items;

        if ( items.length > data.collapse ) {
            result = items.slice(offset);
        }

        let slots = [];

        if ( offset !== compare ) {
            Arr.append(slots, this.item(first));
        }

        if ( offset > 0 ) {
            Arr.append(slots, this.collapse());
        }

        Arr.each(result, (item : any) => {
            Arr.append(slots, this.item(item));
        });

        return this.div('items', slots);
    }

    item(item : any) : any
    {
        const { data } = this.scope;

        let props : any = {
            name: 'item'
        };

        let label = Obj.get(...[
            item, data.labelProp
        ]);

        if ( Mix.isEmpty(label) ) {
            label = Locale.trans(data.undefinedText)
        }

        return this.div(props, [
            h('span', null, [label])
        ])
    }

    collapse() : any
     {
         const { data } = this.scope;

         let props :any = {
             name: 'item'
         }

         return this.div(props, [
             h('span', null, [
                 Locale.trans(data.collapseText)
             ])
         ]);
     }

    placeholder() : any
    {
        const { data } = this.scope;

        return this.div('placeholder', [
            Locale.trans(data.placeholder)
        ]);
    }

    panel() : any
    {
        const { scope, data } = this.scope;

        if ( !data.options.length ) {
            return this.empty();
        }

        let props = {
            ref: scope.ref('panel'),
            class: ['n-popover-shadow']
        };

        props = scope.passProps(props, [
            ...Mix.keys(NCascaderPanelProps)
        ]);

        props['onUpdate:modelValue'] = (value : any) => {
            scope.update('modelValue', value);
        };

        props['onUpdate:splitValue'] = (value : any) => {
            scope.update('splitValue', value);
        };

        return this.comp('n-cascader-panel', props);
    }

}

export default NCascaderView;