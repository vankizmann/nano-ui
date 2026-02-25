import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NSwitchController } from "./NSwitchController.js";

/**
 * @class NSwitchView
 * @extends {BaseView<NSwitchController>}
 */
export class NSwitchView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-switch';

    default()
    {
        let { scope, data } = this.scope.unpack();

        let props = {
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