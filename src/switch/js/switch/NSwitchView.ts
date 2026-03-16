import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NSwitchController } from "./NSwitchController.ts";

export class NSwitchView extends ProtoView
{
    /**
     * @type {NSwitchController}
     */
    declare scope : NSwitchController;

    /**
     * @type {string}
     */
    bem : string = 'n-switch';

    default()
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList
        };

        props.onClick = () => {
            scope.toggle();
        };

        return h('div', props, [
            this.switch(), this.label()
        ]);
    }

    switch()
    {
        return this.div('switch', [
            h('span')
        ]);
    }

    label()
    {
        return this.div('label', [
            this.slot('default')
        ]);
    }

}

export default NSwitchView;