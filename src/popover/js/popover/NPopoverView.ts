import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NPopoverController } from "./NPopoverController.ts";

export class NPopoverView extends ProtoView
{
    /**
     * @type {NPopoverController}
     */
    declare scope : NPopoverController;

    /**
     * @type {string}
     */
    bem : string = 'n-popover';

    default() : any
    {
        let { scope, data } = this.scope;

        let props = {
            ref: scope.ref('el'),
            class: data.classList
        };

        if ( !data.model ) {
            props.class.push('n-hidden');
        }

        return h('div', props, [
            this.body(),
        ]);
    }

    body() : any
    {
        const { data } = this.scope;

        if ( !data.model ) {
            return null;
        }

        const props : any = {
            name: 'frame'
        };

        if ( data.width ) {
            props.style = `width: ${data.width}px;`;
        }

        const { slots } = this.scope.context;

        if ( slots.raw ) {
            return slots.raw();
        }

        const html = [];

        if ( slots.header ) {
            html.push(this.div('header', this.slot('header')));
        }

        if ( slots.default ) {
            html.push(this.div('body', this.slot('default')));
        }

        if ( slots.footer ) {
            html.push(this.div('footer', this.slot('footer')));
        }

        return this.div(props, html);
    }

}

export default NPopoverView;