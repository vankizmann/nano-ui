import { Arr, Mix, Obj, Str } from "@kizmann/pico-js";

export class OptionHelper
{

    static getList(scope : any) : any[]
    {
        const { options } = scope.data;

        const result = Arr.each(options, (v : any, i : any) => {
            return { $index: i, $value: v };
        });

        return result ?? [];
    }

    static getFlat(scope : any, list : any[] = null) : any[]
    {
        const { optionsLabel: ol, optionsValue: ov } = scope.data;

        if ( list == null ) {
            list = this.getList(scope);
        }

        const result = Arr.each(list, (item : any) => {
            return {
                label: Obj.get(item, ol), value: Obj.get(item, ov),
            };
        });

        return result ?? [];
    }

    static getCombineList(scope : any, list : any[]) : any[]
    {
        let value = scope.data.model;

        if ( Mix.isEmpty(value) ) {
            return list;
        }

        if ( !Mix.isArr(value) ) {
            value = Arr.all(value);
        }

        let values = Arr.diff(...[
            value, Arr.extract(list, 'value')
        ]);

        const { allowCreate, undefinedText } = scope.data;

        const fn = (v:any) => {
            return allowCreate ? Mix.str(v) : undefinedText;
        };

        const result = Arr.clone(list);

        Arr.each(values, (v : any) => {
            result.push({ label: fn(v), value: Mix.str(v) });
        });

        return result ?? [];
    }

    static getFilterList(scope : any, list : any[]) : any[]
    {
        let search = scope.data.search;

        if ( Mix.isEmpty(search) ) {
            return list;
        }

        const result = Arr.filter(list, (item : any) => {
            return Str.has(item.label, search);
        });

        return result ?? [];
    }

    static getListItem(scope : any, list : any[], value : any) : any
    {
        const { optionsValue } = scope.data;

        const result = Arr.find(list, (v : any) => {
            return Obj.get(v, optionsValue) === value;
        });

        return result ?? null;
    }

    static getFlatItem(scope : any, list : any[], value : any) : any
    {
        const result = Arr.find(list, (v : any) => {
            return v.value === value;
        });

        return result ?? null;
    }

}

export default OptionHelper;