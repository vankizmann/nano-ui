import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NFormItemController } from "./NFormItemController.ts";
import { Arr, Locale, Mix } from "@kizmann/pico-js";

/**
 * @class NFormItemView
 * @extends {ProtoView<NFormItemController>}
 */
export class NFormItemView extends ProtoView
{
    /**
     * @type {NFormItemController}
     */
    declare scope : NFormItemController;

    /**
     * @type {string}
     */
    bem : string = 'n-form-item';

    default()
    {
        let { scope, data } = this.scope;

        let props : any = {
            ref: scope.ref('el'),
            class: data.classList,
        };

        if ( ! data.model ) {
            props.class.push('is-disabled');
        }

        props['data-ncx'] = scope.uid;

        return h('div', props, [
            this.cond(),
            this.label(),
            this.input(),
            this.error(),
        ]);
    }

    cond()
    {
        const { scope, data } = this.scope;

        if ( ! data.conditional ) {
            return null;
        }

        let props : any = {
            name: 'condition',
        };

        props.onPointerdown = () => {
            scope.superToggle();
        };

        const onoff = [
            Locale.trans('Enable field'),
            Locale.trans('Disable field'),
        ];

        return this.div(props, [
            h('span', null, data.model ? onoff[1] : onoff[0])
        ]);
    }

    label()
    {
        const { data } = this.scope;

        return this.div('label', [
            h('label', null, data.label)
        ]);
    }

    input()
    {
        return this.div('input', [
            this.slot('default')
        ]);
    }

    error()
    {
        const { data } = this.scope;

        const errors = this.scope.ncx('form')
            ?.data.messages ?? {};

        if ( ! errors[data.prop] ) {
            return null;
        }

        return this.div('error', [
            h('span', null, Arr.first(errors[data.prop]))
        ]);
    }

}

export default NFormItemView;