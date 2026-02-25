import { h } from "vue";
import { Locale, Mix, Obj } from "@kizmann/pico-js";

export const NTableFilterString = ({ model, comp, table }) => {

    if ( ! Mix.isStr(model.value) ) {
        Obj.set(model, 'value', '');
    }

    if ( ! model.operator ) {
        Obj.set(model, 'operator', 'li');
    }

    const valueProps = {
        modelValue: model.value,
    };

    valueProps.onEnter = () => {
        table.applyColumnFilter();
    };

    valueProps['onUpdate:modelValue'] = (value) => {
        Obj.set(model, 'value', value);
    };

    const value = h('div', valueProps, [
        comp('n-input', valueProps)
    ])

    const operatorProps = {
        modelValue: model.operator,
    };

    operatorProps['onUpdate:modelValue'] = (value) => {
        Obj.set(model, 'operator', value);
    };

    operatorProps.options = {
        'li': Locale.trans('Includes value'),
        'nl': Locale.trans('Excludes value'),
        'eq': Locale.trans('Equal value'),
        'new': Locale.trans('Except value'),
    };

    const operator = h('div', operatorProps, [
        comp('n-select', operatorProps)
    ]);

    return h('div', null, [
        value, operator
    ]);
};

export default NTableFilterString;