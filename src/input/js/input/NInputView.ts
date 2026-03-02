import { h } from "vue";
import { Arr, Mix, Obj } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NInputController } from "./NInputController.ts";

/**
 * @class NInputView
 * @extends {ProtoView<NInputController>}
 */
export class NInputView extends ProtoView
{
    /**
     * @type {NInputController}
     */
    declare scope : NInputController;

    /**
     * @type {string}
     */
    bem : string = 'n-input';

    default()
    {
        const { attrs, data } = this.scope;

        let props = {
            class: data.classList,
            style: attrs.style,
        };

        const slots = [
            this.input()
        ];

        if ( data.iconPosition === 'before' ) {
            Arr.prepend(slots, this.button());
        }

        if ( data.iconPosition === 'after' ) {
            Arr.append(slots, this.button());
        }

        return h('div', props, [
            ...slots, this.clear()
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
            type: data.native,
            disabled: data.disabled,
            placeholder: data.placeholder,
        });

        props.onInput = (e : any) => {
            scope.update('modelValue', e.target.value);
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

        return h('input', props);
    }

    button()
    {
        let { scope, data } = this.scope;

        if ( Mix.isEmpty(data.icon) ) {
            return null;
        }

        let config : any = {
            name: 'button', class: []
        };

        const props : any = scope.props;

        if ( props.onButtonClick || props.onButtonDblclick ) {
            config.class.push('n-has-event');
        }

        config.onClick = (e : any) => {
            scope.emit('button-click', e);
        };

        config.onDblclick = (e : any) => {
            scope.emit('button-dblclick', e);
        };

        return this.div(config, [
            this.icon(data.icon)
        ]);
    }

}

export default NInputView;