import { h } from "vue";
import { Arr, Mix, Obj, Run } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NCascaderPanelController } from "./NCascaderPanelController.ts";

export class NCascaderPanelView extends ProtoView
{
    /**
     * @type {NCascaderPanelController}
     */
    declare scope : NCascaderPanelController;

    /**
     * @type {string}
     */
    bem : string = 'n-cascader-panel';

    default() : any
    {
        let { data } = this.scope;

        let props = {
            class: data.classList
        };

        const slots = Arr.each(data.virtuals, (val : any, index : number) => {
            return this.items(val[data.childProp] ?? [], index + 1);
        });

        return h('div', props, [
            this.items(data.options, 0), ...slots
        ]);
    }

    items(items : any, depth : number) : any
    {
        const { data } = this.scope;

        if ( Mix.isEmpty(items) ) {
            return null;
        }

        let props = {
            class: data.classPart('items'),
            items: items,
        };

        return this.comp('n-virtualbar', props, ({ value }) => {
            return this.item(value, depth);
        });
    }

    item(item : any, depth : number) : any
    {
        const { scope, data } = this.scope;

        let props : any = {
            disabled: item[data.disabledProp],
        };

        if ( !Mix.isEmpty(item[data.childProp]) ) {
            props.icon = 'fa fa-angle-right';
        }

        const active = Arr.has(...[
            data.model, item[data.valueProp]
        ]);

        if ( active ) {
            props.active = true;
        }

        if ( data.split === item[data.valueProp] ) {
            props.icon = 'fa fa-check';
        }

        const visible = Arr.has(...[
            data.visible, item[data.valueProp]
        ]);

        if ( visible ) {
            props.focus = true;
        }

        props.onPointerenter = () => {
            scope.onMouseenter(item, depth);
        };

        props.onClick = (e : any) => {
            e.preventDefault();
            scope.onClick(item, depth);
        };

        props.onDblclick = (e : any) => {
            e.preventDefault();
            scope.onDblclick(item, depth);
        };

        return this.comp('n-popover-option', props, () => [
            Obj.get(item, data.labelProp)
        ]);
    }

}

export default NCascaderPanelView;