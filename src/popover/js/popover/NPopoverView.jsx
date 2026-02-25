import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NPopoverController } from "./NPopoverController.js";

/**
 * @class NPopoverView
 * @extends {BaseView<NPopoverController>}
 */
export class NPopoverView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-popover';

    default()
    {
        let { scope, data } = this.scope.unpack();

        console.log(data);
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

    body()
    {
        const { data } = this.scope.unpack();

        if ( !data.model ) {
            return null;
        }

        const props = {
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