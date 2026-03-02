import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NCheckboxController } from "./NCheckboxController.ts";

export class NCheckboxView extends ProtoView
{
    /**
     * @type {NCheckboxController}
     */
    declare scope : NCheckboxController;

    /**
     * @type {string}
     */
    bem : string = 'n-checkbox';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList
        };

        props.onClick = () => {
            scope.superToggle();
        };

        return h('div', props, [
            this.checkbox(), this.body()
        ]);
    }

    body() : any
    {
        return this.div('label', [
            this.slot('default')
        ]);
    }

    checkbox() : any
    {
        const { data } = this.scope;

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