import { h } from "vue";
import { Locale, Mix, Obj } from "@kizmann/pico-js";

export const NTableFilterDatetime = ({ model, comp, table }) => {

    if ( !Mix.isStr(model.value) ) {
        Obj.set(model, 'value', '');
    }

    if ( !model.operator ) {
        Obj.set(model, 'operator', 'eq');
    }

    const valueProps : any = {
        modelValue: model.value,
    };

    valueProps.onEnter = () => {
        table.applyColumnFilter();
    };

    valueProps['onUpdate:modelValue'] = (value : any) => {
        Obj.set(model, 'value', value);
    };

    const value = comp('n-form-item', valueProps, () => [
        comp('n-datepicker', valueProps)
    ]);

    const operatorProps : any = {
        modelValue: model.operator,
    };

    operatorProps['onUpdate:modelValue'] = (value : any) => {
        Obj.set(model, 'operator', value);
    };

    operatorProps.options = {
        'eq': Locale.trans('Exact date'),
        'lt': Locale.trans('Before date'),
        'gt': Locale.trans('After date'),
    };

    const operator = comp('n-form-item', null, () => [
        comp('n-select', operatorProps)
    ]);

    return h('div', null, [
        value, operator
    ]);
};

export default NTableFilterDatetime;