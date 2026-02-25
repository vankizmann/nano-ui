import { h } from "vue";
import { ProtoView } from "../../../root/index.js";
import { NButtonController } from "./NButtonController.js";
import { Arr } from "@kizmann/pico-js";

/**
 * @class NButtonView
 * @extends {BaseView<NButtonController>}
 */
export class NButtonView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-button';

    default()
    {
        let { scope, data } = this.scope.unpack();

        let props = {
            class: data.classList,
            disabled: data.disabled,
        };

        props.onClick = (e) => {
            scope.emit('click', e);
        };

        props.onDblclick = (e) => {
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

        return h(data.type, props, slots);
    }

    body()
    {
        let { scope } = this.scope.unpack();

        if ( scope.get('square') ) {
            return null;
        }

        return h('span', null, [
            this.slot('default')
        ]);
    }

}

export default NButtonView;