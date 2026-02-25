import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NResizerController } from "./NResizerController.js";
import { Dom, Mix } from "@kizmann/pico-js";

/**
 * @class NResizerView
 * @extends {BaseView<NResizerController>}
 */
export class NResizerView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-resizer';

    default()
    {
        let { scope, data } = this.scope.unpack();

        let props = {
            ref: scope.ref('el'),
            class: data.classList
        };

        let style = {};

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
        let { scope } = this.scope.unpack();

        let props = {
            name: 'handle', ref: scope.ref('handle'),
        };

        props.onPointerdown = (e) => {
            scope.onMousedown(e);
        };

        return this.div(props);
    }

}

export default NResizerView;