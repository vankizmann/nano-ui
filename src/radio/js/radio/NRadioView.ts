import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NRadioController } from "./NRadioController.ts";

export class NRadioView extends ProtoView
{
    /**
     * @type {NRadioController}
     */
    declare scope : NRadioController;

    /**
     * @type {string}
     */
    bem : string = 'n-radio';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList
        };

        props.onClick = () => {
            scope.superApply();
        };

        return h('div', props, [
            this.radio(), this.body()
        ]);
    }

    body() : any
    {
        return this.div('label', [
            this.slot('default')
        ]);
    }

    radio() : any
    {
        return this.div('radio', [
            h('span')
        ]);
    }

}

export default NRadioView;