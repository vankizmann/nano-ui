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

        if ( !data.keep && !data.model ) {
            return null;
        }

        const props : any = {
            name: 'frame', style: {}
        };

        if ( data.width ) {
            props.style.width = data.safeWidth;
        }

        if ( data.height ) {
            props.style.height = data.safeHeight;
        }

        const { slots } = this.scope.context;

        if ( slots.raw ) {
            return slots.raw({ props });
        }

        const html = [];

        if ( slots.header ) {
            html.push(this.div('header', this.slot('header')));
        }

        if ( slots.default ) {
            html.push(this.content());
        }

        if ( slots.footer ) {
            html.push(this.div('footer', this.slot('footer')));
        }

        return this.div(props, html);
    }

    content() : any
    {
        let { data } = this.scope;

        const props = {
            class: data.classPart('content')
        };

        if ( !data.scrollbar ) {
            return h('div', props, this.slot('default'));
        }

        return this.comp('n-scrollbar', props, () => {
            return this.slot('default');
        });
    }

}

export default NModalView;