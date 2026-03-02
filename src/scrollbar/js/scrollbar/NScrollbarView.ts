import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NScrollbarController } from "./NScrollbarController.ts";

export class NScrollbarView extends ProtoView
{
    /**
     * @type {NScrollbarController}
     */
    declare scope : NScrollbarController;

    /**
     * @type {string}
     */
    bem : string = 'n-scrollbar';

    default()
    {
        let { scope, data } = this.scope;

        let props = {
            ref: scope.ref('el'),
            class: data.classList
        };

        return h('div', props, [
            this.content()
        ]);
    }

    content()
    {
        const { scope } = this.scope;

        let props = {
            ref: scope.ref('viewport'),
            class: `${this.bem}-content`
        };

        return h('div', props, [
            this.body()
        ]);
    }

    body()
    {
        let { data } = this.scope;

        let props = {
            class: data.wrapClass.replace(':bem', this.bem)
        };

        return h('div', props, [
            this.slot('default')
        ]);
    }

}

export default NScrollbarView;