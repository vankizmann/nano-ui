import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NRadioController } from "./NRadioController.js";

/**
 * @class NRadioView
 * @extends {BaseView<NRadioController>}
 */
export class NRadioView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-radio';

    default()
    {
        let { scope, data } = this.scope.unpack();

        let props = {
            class: data.classList
        };

        props.onClick = () => {
            scope.apply();
        };

        return h('div', props, [
            this.radio(), this.body()
        ]);
    }

    body()
    {
        return this.div('label', [
            this.slot('default')
        ]);
    }

    radio()
    {
        return this.div('radio', [
            h('span')
        ]);
    }

}

export default NRadioView;