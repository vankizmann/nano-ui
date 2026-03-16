import { h } from "vue";
import { Arr, Mix } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NTabsItemController } from "./NTabsItemController.ts";
import NTabsController from "../tabs/NTabsController.ts";

export class NTabsItemView extends ProtoView
{
    /**
     * @type {NTabsItemController}
     */
    declare scope : NTabsItemController;

    /**
     * @type {string}
     */
    bem : string = 'n-tabs-item';

    default() : any
    {
        let { scope, data } = this.scope;

        if ( ! scope.isActive() ) {
            return null;
        }

        if ( ! data.init ) {
            scope.set('init', true);
        }

        let props : any = {
            class: data.classList,
            wrapClass: `${this.bem}__wrap`,
        };

        const tabs = scope.ncx('tabs');

        if ( tabs.data.float ) {
            props.class.push('n-float');
        }

        if ( ! scope.isVisible() ) {
            props.style = 'display: none;';
        }

        const slot = () => {
            return this.slot('default');
        };

        if ( ! data.scrollbar ) {
            return h('div', props, slot());
        }

        return this.comp('n-scrollbar', ...[
            props, slot
        ]);
    }

    header(tabs: NTabsController) : any
    {
        const { data } = this.scope

        const props : any = {
            class: data.classPart('header')
        };

        if ( tabs.data.value === data.name ) {
            props.class.push('n-active');
        }

        props.onPointerdown = () => {
            tabs.superToggle(data.name);
        };

        props.onDragenter = () => {
            if( tabs.data.dragOpen ) {
                tabs.superToggle(data.name);
            }
        };

        return this.div(props, [
            this.header_icon(tabs),
            this.header_label(tabs),
        ]);
    }

    header_icon(tabs: NTabsController) : any
    {
        const { data } = this.scope;

        if ( Mix.isEmpty(data.icon) ) {
            return null;
        }

        return this.div('icon', [
            this.icon(data.icon)
        ]);
    }

    header_label(tabs: NTabsController) : any
    {
        const { data } = this.scope;

        return this.div('label', [
            h('span', null, data.label)
        ]);
    }

}

export default NTabsItemView;