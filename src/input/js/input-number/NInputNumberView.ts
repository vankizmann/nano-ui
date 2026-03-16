import { h } from "vue";
import { Dom, Locale, Mix, Obj, Run, Str } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NInputNumberController } from "./NInputNumberController.ts";

export class NInputNumberView extends ProtoView
{
    /**
     * @type {NInputNumberController}
     */
    declare scope : NInputNumberController;

    /**
     * @type {string}
     */
    bem : string = 'n-input-number';

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

        const count = Str.number(...[
            data.model, data.precision
        ]);

        let value = Locale.replace(data.format, {
            count
        });

        if ( !Mix.isNum(data.model) ) {
            value = '';
        }

        let props = Obj.except(scope.attrs, exclude, {
            ref: scope.ref('input'),
            value: value,
            type: data.type,
            disabled: data.superDisabled,
            placeholder: data.placeholder,
        });

        props.onInput = (e : any) => {
            scope.emit('input', e);
        };

        props.onKeydown = (e : any) => {
            if ( e.which === 13 ) scope.applyFormat(e.target.value);
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
            scope.applyFormat(e.target.value);
            data.focus = 0;
            scope.emit('blur', e);
        };

        return h('input', props);
    }

    prev()
    {
        let { scope, data } = this.scope;

        const props : any = {
            name: 'decrease'
        };

        let intval : any, bounce : any;

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
        let { scope } = this.scope;

        const props : any = {
            name: 'increase'
        };

        let intval : any, bounce : any;

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