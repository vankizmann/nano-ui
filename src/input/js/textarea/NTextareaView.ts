import { h } from "vue";
import { Mix, Obj } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NTextareaController } from "./NTextareaController.ts";

/**
 * @class NTextareaView
 * @extends {ProtoView<NTextareaController>}
 */
export class NTextareaView extends ProtoView
{
    /**
     * @type {NTextareaController}
     */
    declare scope : NTextareaController;

    /**
     * @type {string}
     */
    bem : string = 'n-textarea';

    default()
    {
        const { attrs, data } = this.scope;

        let props = {
            class: data.classList,
            style: attrs.style,
        };

        return h('div', props, [
            this.input()
        ]);
    }

    input()
    {
        let { scope, data } = this.scope;

        const exclude = [
            'class',
            'style',
            'value',
            'type',
            'placeholder',
            'onInput',
            'onKeydown',
            'onKeyup',
        ];

        let props = Obj.except(scope.attrs, exclude, {
            ref: scope.ref('input'),
            value: data.model,
            type: data.type,
            rows: data.minRows,
            disabled: data.superDisabled,
            placeholder: data.placeholder,
        });

        if ( data.maxLength ) {
            props.maxLength = data.maxLength;
        }

        let currentRows = (Mix.str(data.model).match(/\n/g) || []).length + 1;

        if ( data.autoRows && props.rows < currentRows ) {
            props.rows = currentRows <= data.maxRows ? currentRows : data.maxRows;
        }

        props.onInput = (e : any) => {
            data.model = e.target.value;
            scope.emit('input', e);
        };

        props.onKeydown = (e : any) => {
            scope.emit('keydown', e);
        };

        props.onKeyup = (e : any) => {
            scope.emit('keyup', e);
        };

        props.onFocus = (e : any) => {
            data.focus = 1;
            scope.emit('focus', e);
        };

        props.onBlur = (e : any) => {
            data.focus = 0;
            scope.emit('blur', e);
        };

        return h('textarea', props);
    }

}

export default NTextareaView;