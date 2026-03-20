import { h } from "vue";
import { Arr } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NButtonController } from "./NButtonController.ts";

export class NButtonView extends ProtoView
{
    /**
     * @type {NButtonController}
     */
    declare scope : NButtonController;

    /**
     * @type {string}
     */
    bem : string = 'n-button';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList,
            disabled: data.superDisabled,
        };

        props.onPointerdown = (e : any) => {
            if (e.which === 1) scope.emit('click', e);
        };

        props.onDblclick = (e : any) => {
            scope.emit('dblclick', e);
        };

        const slots = [
            this.body()
        ];

        if ( data.iconPosition === 'before' ) {
            Arr.prepend(slots, this.icon(data.icon));
        }

        if ( data.iconPosition === 'after' ) {
            Arr.append(slots, this.icon(data.icon));
        }

        return h(data.native, props, slots);
    }

    body() : any
    {
        let { scope, context} = this.scope;

        if ( scope.get('square') ) {
            return null;
        }

        if ( ! context.slots.default ) {
            return null;
        }

        return h('span', null, [
            this.slot('default')
        ]);
    }

}

export default NButtonView;