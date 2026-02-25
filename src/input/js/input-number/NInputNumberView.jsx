import { h, withKeys } from "vue";
import { Arr, Dom, Locale, Mix, Num, Obj, Run, Str } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.js";
import { NInputNumberController } from "./NInputNumberController.js";

/**
 * @class NInputNumberView
 * @extends {BaseView<NInputNumberController>}
 */
export class NInputNumberView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-input-number';

    default()
    {
        const { attrs, data } = this.scope;

        let props = {
            class: data.classList,
            style: attrs.style,
        };

        return h('div', props, [
            this.prev(),
            this.input(),
            this.clear(),
            this.next(),
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

        const count = Str.number(...[
            data.model, data.precision
        ]);

        let value = Locale.replace(data.format, {
            count
        });

        if ( ! Mix.isNum(data.model) ) {
            value = '';
        }

        let props = Obj.except(scope.attrs, exclude, {
            ref: scope.ref('input'),
            value: value,
            type: data.type,
            disabled: data.disabled,
            placeholder: data.placeholder,
        });

        props.onInput = (e) => {
            scope.emit('input', e);
        };

        props.onKeydown = (e) => {
            if ( e.which === 13 ) scope.applyFormat(e.target.value);
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
            scope.applyFormat(e.target.value);
            data.focus = 0;
            scope.emit('blur', e);
        };

        return h('input', props);
    }

    prev()
    {
        let { scope, data } = this.scope.unpack();

        const props = {
            name: 'decrease'
        };

        let intval, bounce;

        const fn = () => {
            intval = Run.interval(() => {
                scope.decreaseNumber();
            }, 120);
        };

        props.onPointerdown = () => {

            bounce = Run.delay(() => {
                fn();
            }, 500);

            Dom.find(window).once('pointerup', () => {
                intval && intval();
                bounce && bounce();
            });

            scope.decreaseNumber();
        };

        return this.div(props, [
            this.icon('fa fa-minus')
        ]);
    }

    next()
    {
        let { scope, data } = this.scope.unpack();

        const props = {
            name: 'increase'
        };

        let intval, bounce;

        const fn = () => {
            intval = Run.interval(() => {
                scope.increaseNumber();
            }, 120);
        };

        props.onPointerdown = () => {

            bounce = Run.delay(() => {
                fn();
            }, 500);

            Dom.find(window).once('pointerup', () => {
                intval && intval();
                bounce && bounce();
            });

            scope.increaseNumber();
        };

        return this.div(props, [
            this.icon('fa fa-plus')
        ]);
    }

}

export default NInputNumberView;