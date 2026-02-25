import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NCheckboxController } from "./NCheckboxController.js";

/**
 * @class NCheckboxView
 * @extends {BaseView<NCheckboxController>}
 */
export class NCheckboxView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-checkbox';

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
            this.checkbox(), this.body()
        ]);
    }

    body()
    {
        return this.div('label', [
            this.slot('default')
        ]);
    }

    checkbox()
    {
        const { data } = this.scope.unpack();

        let config = {
            icon: 'fa fa-minus',
        };

        if ( data.model ) {
            config.icon = 'fa fa-check';
        }

        return this.div('checkbox', [
            this.icon(config)
        ]);
    }

}

export default NCheckboxView;