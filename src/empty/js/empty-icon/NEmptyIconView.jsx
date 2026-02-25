import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NEmptyIconController } from "./NEmptyIconController.js";

/**
 * @class NEmptyIconView
 * @extends {BaseView<NEmptyIconController>}
 */
export class NEmptyIconView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-empty-icon';

    default()
    {
        let { scope, data } = this.scope.unpack();

        let props = {
            class: data.classList
        };

        return h('div', props, [
            this.type(), this.body()
        ]);
    }

    type()
    {
        return this.div('type', [
            this.slot('icon')
        ]);
    }

    body()
    {
        return this.div('text', [
            this.slot('default')
        ]);
    }

}

export default NEmptyIconView;