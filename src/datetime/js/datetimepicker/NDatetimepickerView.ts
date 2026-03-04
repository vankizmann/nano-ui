import { h } from "vue";
import { Arr, Dom, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NDatetimepickerController } from "./NDatetimepickerController.ts";
import { NPopoverPanelView } from "../../../popover/js/popover-panel/NPopoverPanelView.ts";

export class NDatetimepickerView extends NPopoverPanelView
{
    /**
     * @type {NDatetimepickerController}
     */
    declare scope : NDatetimepickerController;

    /**
     * @type {string}
     */
    bem : string = 'n-datetimepicker';

    display() : any
    {
        return this.div('display', [
            this.input(),
            this.clear(),
            this.angle(),
        ]);
    }

    input() : any
    {
        const { scope, data } = this.scope;

        if ( data.range ) {
            return null;
        }

        let props : any = {
            value: data.input,
            placeholder: data.placeholder,
        };

        if ( ! data.date.input ) {
            props.value = '';
        }

        props.onInput = (e : any) => {
            scope.set('input', e.target.value);
        };

        props.onFocus = () => {
            scope.onFocus();
        };

        props.onKeydown = (e : any) => {
            if ( e.which === 9 ) scope.onBlur();
            if ( e.which === 13 ) scope.onInput();
        };

        return this.div('input', [
            h('input', props)
        ]);
    }

    panel() : any
    {
        let props = {
            class: `${this.bem}-panel`
        };

        return h('div', props, [
            this.datepicker(), this.timepicker()
        ]);
    }

    datepicker() : any
    {
        const { scope, data } = this.scope;

        let props = {
            ref: scope.ref('datepicker'),
            class: `${this.bem}__date-panel`,
        };

        props = scope.passProps(props, [
            'modelValue',
            'clearValue',
            'panels',
            'format',
            'minDate',
            'maxDate',
        ]);

        props['onUpdate:modelValue'] = (value : any) => {
            scope.update('modelValue', value);
        };

        return this.comp('n-datepicker-panel', props);
    }

    timepicker() : any
    {
        const { scope, data } = this.scope;

        let props = {
            ref: scope.ref('timepicker'),
            class: `${this.bem}__time-panel`,
        };

        props = scope.passProps(props, [
            'modelValue',
            'clearValue',
            'format',
        ]);

        props['onUpdate:modelValue'] = (value : any) => {
            scope.update('modelValue', value);
        };

        return this.comp('n-timepicker-panel', props);
    }

}

export default NDatetimepickerView;