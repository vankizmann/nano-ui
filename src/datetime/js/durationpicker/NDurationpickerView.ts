import { h } from "vue";
import { Arr, Dom, Hash, Locale, Mix, Obj } from "@kizmann/pico-js";
import { NDurationpickerController } from "./NDurationpickerController.ts";
import { NPopoverPanelView } from "../../../popover/js/popover-panel/NPopoverPanelView.ts";
import { Styler } from "../../../root/index.ts";
import { NDateHelper } from "../helper/NDateHelper.ts";

export class NDurationpickerView extends NPopoverPanelView
{
    /**
     * @type {NDurationpickerController}
     */
    declare scope : NDurationpickerController;

    /**
     * @type {string}
     */
    bem : string = 'n-durationpicker';

    /**
     * @type {any}
     */
    popoverConfig : any = {
        width: -1,
    };

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

        if ( data.range ) {
            return null;
        }

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
            if ( e.which === 13 ) scope.onInput();
            if ( e.which === 38 ) scope.scrollToIndex(data.index - 1);
            if ( e.which === 40 ) scope.scrollToIndex(data.index + 1);
        };

        return this.div('input', [
            h('input', props)
        ]);
    }

    panel() : any
    {
        const { scope, data } = this.scope;

        if ( !data.options.length ) {
            return this.empty();
        }

        const items = Arr.each(data.options, (value : any) => {
            return { value };
        })

        let props : any = {
            ref: scope.ref('scrollbar'),
            class: `${this.bem}__body`,
            items: items,
        };

        props.onReady = () => {
            this.scope.onReady();
        };

        const slots : any = {};

        slots.default = (item : any) => {
            return this.item(item);
        };

        return this.comp('n-virtualbar', props, slots);
    }

    item({ value, index }) : any
    {
        const { scope, data } = this.scope;

        let props : any = {
            focus: index === data.index
        };

        props.onClick = () => {
            scope.set('index', index);
            scope.update('modelValue', value.value);
        };

        props.active = Arr.has(...[
            data.model, value.value
        ]);

        if ( props.active ) {
            props.icon = Styler.icon('check');
        }

        return this.comp('n-popover-option', props, () => [
            NDateHelper.getDurationString(this.scope, value.value)
        ]);
    }

}

export default NDurationpickerView;