import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NProgressController } from "./NProgressController.ts";

export class NProgressView extends ProtoView
{
    /**
     * @type {NProgressController}
     */
    declare scope : NProgressController;

    /**
     * @type {string}
     */
    bem : string = 'n-progress';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            ref: scope.ref('el'),
            class: data.classList,
        };

        return h('div', props, [
            this.bar()
        ]);
    }

    bar() : any
    {
        const { data } = this.scope;

        let props : any = {
            class: data.classPart('bar')
        };

        props.style = {
            '--n-progress-width': data.model + '%'
        };

        return h('div', props);
    }

}

export default NProgressView;