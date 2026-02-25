import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NScrollbarController } from "./NScrollbarController.js";

/**
 * @class NScrollbarView
 * @extends {BaseView<NScrollbarController>}
 */
export class NScrollbarView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-scrollbar';

    default()
    {
        let { scope, data } = this.scope.unpack();

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
        let props = {
            class: `${this.bem}-content`
        };

        return h('div', props, [
            this.body()
        ]);
    }

    body()
    {
        let { data } = this.scope.unpack();

        let props = {
            class: data.wrapClass.replace(':bem', this.bem)
        };

        return h('div', props, [
            this.slot('default')
        ]);
    }

}

export default NScrollbarView;