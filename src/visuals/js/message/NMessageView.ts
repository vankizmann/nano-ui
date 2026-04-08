import { h } from "vue";
import { ProtoView, Styler } from "../../../root/index.ts";
import { NMessageController } from "./NMessageController.ts";

export class NMessageView extends ProtoView
{
    /**
     * @type {NMessageController}
     */
    declare scope : NMessageController;

    /**
     * @type {string}
     */
    bem : string = 'n-message';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            ref: scope.ref('el'),
            class: data.classList,
        };

        return h('div', props, [
            this.wrapper()
        ]);
    }

    wrapper() : any
    {
        return this.div('wrapper', [
            this.symbol(), this.body(), this.close()
        ]);
    }

    symbol() : any
    {
        let { scope, data } = this.scope;

        if ( ! data.icon ) {
            return null;
        }

        return this.div('symbol', [
            this.icon(data.icon)
        ]);
    }

    body() : any
    {
        return this.div('body', [
            this.title(), this.text()
        ]);
    }

    title() : any
    {
        let { scope, data } = this.scope;

        if ( ! data.title ) {
            return null;
        }

        return this.div('title', [
            h('span', null, [data.title])
        ]);
    }

    text() : any
    {
        return this.div('text', [
            this.slot('default')
        ]);
    }

    close() : any
    {
        const { scope, data } = this.scope;

        if ( ! data.closable ) {
            return null;
        }

        let props : any = {
            href: 'javascript:void(0);'
        };

        props.onPointerdown = (e : any) => {
            scope.update('modelValue', false);
        };

        return this.div('close', [
            h('a', props, [this.icon(Styler.icon('times'))])
        ]);
    }

}

export default NMessageView;