import { h } from "vue";
import { Mix } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NResizerController } from "./NResizerController.ts";

export class NResizerView extends ProtoView
{
    /**
     * @type {NResizerController}
     */
    declare scope : NResizerController;

    /**
     * @type {string}
     */
    bem : string = 'n-resizer';

    default()
    {
        let { scope, data } = this.scope;

        let props = {
            ref: scope.ref('el'),
            class: data.classList
        };

        let style : any = {};

        if ( Mix.isNum(data.model) ) {
            style.width = `${data.model}px`;
        }

        if ( !style.width && data.flex ) {
            style.flex = data.flex;
        }

        if ( data.model ) {
            style.flex = `0 0 ${data.model}px`;
        }

        if ( Mix.isNum(data.minWidth) ) {
            style.minWidth = `${data.minWidth}px`;
        }

        if ( Mix.isNum(data.maxWidth) ) {
            style.maxWidth = `${data.maxWidth}px`;
        }

        return h('div', { ...props, style }, [
            this.handle(), this.slot()
        ]);
    }

    handle()
    {
        let { scope } = this.scope;

        let props : any = {
            name: 'handle', ref: scope.ref('handle'),
        };

        props.onPointerdown = (e : any) => {
            scope.onPointerdown(e);
        };

        return this.div(props);
    }

}

export default NResizerView;