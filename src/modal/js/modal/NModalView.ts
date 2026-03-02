import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NModalController } from "./NModalController.ts";

export class NModalView extends ProtoView
{
    /**
     * @type {NModalController}
     */
    declare scope : NModalController;

    /**
     * @type {string}
     */
    bem : string = 'n-modal';

    default() : any
    {
        let { uid, scope, data } = this.scope;

        let props = {
            ref: scope.ref('el'),
            class: data.classList
        };

        if ( !data.model ) {
            props.class.push('n-hidden');
        }

        return h('div', props, [
            this.body()
        ]);
    }

    body() : any
    {
        const { scope, data } = this.scope;

        if ( !data.model ) {
            return null;
        }

        const props : any = {
            name: 'frame',
        };

        let style = [];

        if ( data.width ) {
            style.push(`width: ${data.width}px;`);
        }

        if ( data.height ) {
            style.push(`height: ${data.height}px;`);
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

        return this.div({ ...props, style: style.join(' ') }, html);
    }

}

export default NModalView;