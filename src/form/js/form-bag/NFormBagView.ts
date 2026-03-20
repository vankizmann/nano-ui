import { h } from "vue";
import { Arr, Mix } from "@kizmann/pico-js";
import { ProtoView, Styler } from "../../../root/index.ts";
import { NFormBagController } from "./NFormBagController.ts";
import NFormItemController from "../form-item/NFormItemController.ts";

export class NFormBagView extends ProtoView
{
    /**
     * @type {NFormBagController}
     */
    declare scope : NFormBagController;

    /**
     * @type {string}
     */
    bem : string = 'n-form-bag';

    default() : any
    {
        let { scope, data } = this.scope;

        const errors = scope.ncx('form')
            ?.data.messages;

        if ( Mix.isEmpty(errors) ) {
            return null;
        }

        const fields = scope.ncx('form').childs;

        const items = Arr.each(fields, (field : any) => {
            return this.field(field, errors);
        });

        let props : any = {
            class: data.classList,
        };

        return h('div', props, items);
    }

    field(field : NFormItemController, errors: any) : any
    {
        const { prop, label } = field.data;

        if ( ! errors[prop] ) {
            return null;
        }

        const { scope, data } = this.scope;

        let props : any = {
            name: 'item'
        };

        props.onPointerdown = () => {
            field.superView();
            scope.ncx('popover')?.superClose();
        };

        const items = Arr.each(errors[prop], (err : string) => {
            return h('li', null, err);
        });

        const list = this.div('list', [
            h('ul', null, items)
        ]);

        const link = this.div('link', [
            this.icon(Styler.icon('locate')), h('span', null, label)
        ]);

        return this.div(props, [link, list]);
    }

}

export default NFormBagView;