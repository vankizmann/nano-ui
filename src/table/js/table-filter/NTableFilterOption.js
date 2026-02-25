import { h } from "vue";
import { Arr, Locale, Mix, Obj } from "@kizmann/pico-js";

export const NTableFilterOption = ({ model, comp, column, table }) => {

    if ( ! Mix.isArr(model.value) ) {
        Obj.set(model, 'value', []);
    }

    if ( ! model.operator ) {
        Obj.set(model, 'operator', 'in');
    }

    const valueProps = {
        modelValue: model.value,
        align: 'vertical',
    };

    valueProps['onUpdate:modelValue'] = (value) => {
        Obj.set(model, 'value', value);
    };

    const values = Arr.each(column.getOptions(), ({ label, value }) => {
        return comp('n-checkbox', { value }, () => label);
    });

    const value = h('div', valueProps, [
        comp('n-checkbox-group', valueProps, () => values),
    ]);

    const operatorProps = {
        modelValue: model.operator,
    };

    operatorProps['onUpdate:modelValue'] = (value) => {
        Obj.set(model, 'operator', value);
    };

    operatorProps.options = {
        'in': Locale.trans('Includes value'),
        'ni': Locale.trans('Excludes value'),
    };

    const operator = h('div', operatorProps, [
        comp('n-select', operatorProps)
    ]);

    return h('div', null, [
        value, operator
    ]);
};

export default NTableFilterOption;