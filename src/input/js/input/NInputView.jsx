import { h, withKeys } from "vue";
import { Arr, Mix, Obj } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.js";
import { NInputController } from "./NInputController.js";

/**
 * @class NInputView
 * @extends {BaseView<NInputController>}
 */
export class NInputView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-input';

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
            disabled: data.disabled,
            placeholder: data.placeholder,
        });

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

        return h('input', props);
    }

    button()
    {
        let { scope, data } = this.scope.unpack();

        if ( Mix.isEmpty(data.icon) ) {
            return null;
        }

        let config = {
            name: 'button', class: []
        };

        const props = scope.props;

        if ( props.onButtonClick || props.onButtonDblclick ) {
            config.class.push('n-has-event');
        }

        config.onClick = (e) => {
            scope.emit('button-click', e);
        };

        config.onDblclick = (e) => {
            scope.emit('button-dblclick', e);
        };

        return this.div(config, [
            this.icon(data.icon)
        ]);
    }

}

export default NInputView;