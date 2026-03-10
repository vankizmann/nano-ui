import { h } from "vue";
import { Arr, Locale, Mix, Obj } from "@kizmann/pico-js";
import { ProtoView, Styler } from "../../../root/index.ts";
import { NInputFileController } from "./NInputFileController.ts";

/**
 * @class NInputFileView
 * @extends {ProtoView<NInputFileController>}
 */
export class NInputFileView extends ProtoView
{
    /**
     * @type {NInputFileController}
     */
    declare scope : NInputFileController;

    /**
     * @type {string}
     */
    bem : string = 'n-input-file';

    default()
    {
        const { attrs, data } = this.scope;

        let props = {
            class: data.classList,
            style: attrs.style,
        };

        return h('div', props, [
            this.input(), this.button(), this.hidden()
        ]);
    }

    input()
    {
        let { scope, data } = this.scope;

        const props : any = {
            modelValue: Obj.get(data.model, 'name'),
            disabled: true,
        };

        const texts : [string, number] = [
            data.countText, data.model?.length
        ];

        if ( data.multiple ) {
            props.modelValue = Locale.choice(...texts);
        }

        return this.comp('n-input', props);
    }

    button()
    {
        let { scope, data } = this.scope;

        const props : any = {
            glass: data.glass,
        };

        props.onClick = () => {
            scope.rel('input')?.click();
        };

       return this.comp('n-button', props, () => [
           Locale.trans(data.buttonText)
       ]);
    }

    hidden()
    {
        let { scope, data } = this.scope;

        const props : any = {
            ref: scope.ref('input'),
            type: 'file',
            multiple: data.multiple
        };

        props.onInput = () => {
            scope.updateModel();
        };

        return this.div('input', [
            h('input', props)
        ]);
    }

}

export default NInputFileView;