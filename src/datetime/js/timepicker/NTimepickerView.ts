import { h } from "vue";
import { Arr, Dom, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NTimepickerController } from "./NTimepickerController.ts";
import { NPopoverPanelView } from "../../../popover/js/popover-panel/NPopoverPanelView.ts";
import { NTimepickerPanelProps } from "../timepicker-panel/NTimepickerPanel.ts";

export class NTimepickerView extends NPopoverPanelView
{
    /**
     * @type {NTimepickerController}
     */
    declare scope : NTimepickerController;

    /**
     * @type {string}
     */
    bem : string = 'n-timepicker';

    display() : any
    {
        return this.div('display', [
            this.handle(),
            this.input(),
            this.clear(),
            this.angle(),
        ]);
    }

    input() : any
    {
        const { scope, data } = this.scope;

        let props : any = {
            ref: scope.ref('input'),
            value: data.input,
            placeholder: data.placeholder,
        };

        props.onInput = (e : any) => {
            scope.set('input', e.target.value);
        };

        props.onFocus = () => {
            scope.onFocus();
        };

        props.onKeydown = (e : any) => {
            if ( e.which === 9 ) scope.onBlur();
            if ( e.which === 13 ) scope.onEnter();
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
            class: ['n-popover-shadow']
        };

        props = scope.passProps(props, [
            ...Mix.keys(NTimepickerPanelProps)
        ]);

        props['onUpdate:modelValue'] = (value : any) => {
            scope.update('modelValue', value);
        };

        return this.comp('n-timepicker-panel', props);
    }

}

export default NTimepickerView;