import { h } from "vue";
import { Arr, Mix } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NTabsController } from "./NTabsController.ts";
import NTabsItemController from "../tabs-item/NTabsItemController.ts";

export class NTabsView extends ProtoView
{
    /**
     * @type {NTabsController}
     */
    declare scope : NTabsController;

    /**
     * @type {string}
     */
    bem : string = 'n-tabs';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            ref: scope.ref('el'),
            class: data.classList,
        };

        return h('div', props, [
            this.header(), this.body()
        ]);
    }

    header() : any
    {
        const { scope, data } = this.scope;

        const items = Arr.each(data.sorted, (item: any) => {
            return item.view.header(scope);
        });

        const props : any = {
            ref: scope.ref('indicator'),
            name: 'indicator',
        };

        const indicator = this.div(props, [
            //
        ]);

        return this.div('header', [
            indicator, ...items
        ]);
    }

    body() : any
    {
        return this.div('body', [
            this.slot('default')
        ]);
    }

}

export default NTabsView;