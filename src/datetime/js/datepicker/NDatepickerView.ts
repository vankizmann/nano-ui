import { h } from "vue";
import { Arr, Dom, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NDatepickerController } from "./NDatepickerController.ts";
import { NPopoverPanelView } from "../../../popover/js/popover-panel/NPopoverPanelView.ts";
import { NDatepickerPanelProps } from "../datepicker-panel/NDatepickerPanel.ts";

export class NDatepickerView extends NPopoverPanelView
{
    /**
     * @type {NDatepickerController}
     */
    declare scope : NDatepickerController;

    /**
     * @type {string}
     */
    bem : string = 'n-datepicker';

    display() : any
    {
        return this.div('display', [
            this.input(),
            this.range(),
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

    range()
    {
        return [
            this.arrive(), this.seperator(), this.depart()
        ];
    }

    seperator()
    {
        const { data } = this.scope;

        if ( ! data.range ) {
            return null;
        }

        return this.div('seperator', [
            data.rangeSeperator
        ]);
    }

    arrive() : any
    {
        const { scope, data } = this.scope;

        if ( ! data.range ) {
            return null;
        }

        let props : any = {
            value: data.inputs[0],
            placeholder: data.placeholderArrive,
        };

        if ( ! data.dates[0].input ) {
            props.value = '';
        }

        props.onInput = (e : any) => {
            scope.vals['inputs'].value[0] = e.target.value;
        };

        props.onFocus = () => {
            scope.onFocus();
        };

        props.onKeydown = (e : any) => {
            // if ( e.which === 9 ) scope.onBlur();
            if ( e.which === 13 ) scope.onArrive();
        };

        return this.div('input', [
            h('input', props)
        ]);
    }

    depart() : any
    {
        const { scope, data } = this.scope;

        if ( ! data.range ) {
            return null;
        }

        let props : any = {
            value: data.inputs[1],
            placeholder: data.placeholderDepart,
        };

        if ( ! data.dates[1].input ) {
            props.value = '';
        }

        props.onInput = (e : any) => {
            scope.vals['inputs'].value[1] = e.target.value;
        };

        props.onFocus = () => {
            scope.onFocus();
        };

        props.onKeydown = (e : any) => {
            if ( e.which === 9 ) scope.onBlur();
            if ( e.which === 13 ) scope.onDepart();
        };

        return this.div('input', [
            h('input', props)
        ]);
    }

    panel() : any
    {
        const { scope, data } = this.scope;

        let props = {
            ref: scope.ref('panel'),
        };

        props = scope.passProps(props, [
            ...Mix.keys(NDatepickerPanelProps)
        ]);

        props['onUpdate:modelValue'] = (value : any) => {
            scope.update('modelValue', value);
        };

        props['onUpdate:arrive'] = (value : any) => {
            scope.update('arrive', value);
        };

        props['onUpdate:depart'] = (value : any) => {
            scope.update('depart', value);
        };

        return this.comp('n-datepicker-panel', props);
    }

}

export default NDatepickerView;