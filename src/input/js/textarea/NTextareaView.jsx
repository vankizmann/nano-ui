import { h, withKeys } from "vue";
import { Arr, Obj } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.js";
import { NTextareaController } from "./NTextareaController.js";

/**
 * @class NTextareaView
 * @extends {BaseView<NTextareaController>}
 */
export class NTextareaView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-textarea';

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
        let { scope, data } = this.scope.unpack();

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
            disabled: data.disabled,
            placeholder: data.placeholder,
        });

        if ( data.maxLength ) {
            props.maxLength = data.maxLength;
        }

        let currentRows = (data.model.match(/\n/g) || []).length + 1;

        if ( data.autoRows && props.rows < currentRows ) {
            props.rows = currentRows <= data.maxRows ? currentRows : data.maxRows;
        }

        props.onInput = (e) => {
            data.model = e.target.value;
            scope.emit('input', e);
        };

        props.onKeydown = (e) => {
            scope.emit('keydown', e);
        };

        props.onKeyup = (e) => {
            scope.emit('keyup', e);
        };

        props.onFocus = (e) => {
            data.focus = 1;
            scope.emit('focus', e);
        };

        props.onBlur = (e) => {
            data.focus = 0;
            scope.emit('blur', e);
        };

        return h('textarea', props);
    }

}

export default NTextareaView;